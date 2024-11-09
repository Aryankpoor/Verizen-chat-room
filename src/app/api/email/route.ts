import { NextRequest, NextResponse } from 'next/server'
import Imap from 'imap'
import { simpleParser, ParsedMail } from 'mailparser'
import { Readable } from 'stream'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, imapHost } = await req.json()

    const imapConfig: Imap.Config = {
      user: email,
      password: password,
      host: imapHost,
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
      },
    }

    const imap = new Imap(imapConfig)

    return new Promise((resolve) => {
      imap.once('ready', () => {
        imap.openBox('INBOX', false, (err) => {
          if (err) {
            console.error('Error opening mailbox:', err)
            resolve(NextResponse.json({ error: 'Failed to open mailbox' }, { status: 500 }))
            return
          }

          imap.search(['UNSEEN'], (err, results) => {
            if (err) {
              console.error('IMAP search error:', err)
              resolve(NextResponse.json({ error: 'Failed to search emails' }, { status: 500 }))
              return
            }

            const f = imap.fetch(results, { bodies: '' })
            const emails: Array<{uid: string, subject: string | undefined, from: string | undefined}> = []

            f.on('message', (msg) => {
              msg.on('body', (stream: Readable) => {
                simpleParser(stream, (err: Error | null, parsed: ParsedMail) => {
                  if (err) {
                    console.error('Email parsing error:', err)
                    return
                  }
                  emails.push({
                    uid: parsed.messageId || '',
                    subject: parsed.subject,
                    from: parsed.from?.text,
                  })
                })
              })
            })

            f.once('error', (ex: Error) => {
              console.error('Fetch error:', ex)
              resolve(NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 }))
            })

            f.once('end', () => {
              imap.end()
              resolve(NextResponse.json(emails))
            })
          })
        })
      })

      imap.once('error', (err: Error) => {
        console.error('IMAP connection error:', err)
        resolve(NextResponse.json({ error: 'Failed to connect to IMAP server' }, { status: 500 }))
      })

      imap.connect()
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}