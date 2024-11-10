import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/app/emails/email";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const {
            invoiceID,
            items,
            title,
            amount,
            customerEmail,
            issuerName,
            accountNumber,
            currency,
        } = await req.json();

        if (!invoiceID || !items || !title || !amount || !customerEmail || !issuerName || !accountNumber || !currency) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        let parsedItems;
        try {
            parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
        } catch (error) {
            console.error("Error parsing items:", error);
            return NextResponse.json({ message: "Invalid items format" }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [customerEmail],
            subject: title,
            react: EmailTemplate({
                invoiceID,
                items: parsedItems,
                amount: Number(amount),
                issuerName,
                accountNumber,
                currency,
            }),
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json(
                { message: "Email not sent!", error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: "Email delivered!", data }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { message: "Email not sent!", error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}