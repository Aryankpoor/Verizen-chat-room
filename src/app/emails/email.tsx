import {
    Html,
    Body,
    Head,
    Heading,
    Hr,
    Container,
    Preview,
    Section,
    Text
  } from "@react-email/components";
  import { Tailwind } from "@react-email/tailwind";
  
  interface Props {
      invoiceID: string;
      items: Item[];
      amount: number;
      issuerName: string;
      accountNumber: string;
      currency: string;
  }
  
  interface Item {
      cost: number;
      quantity: number;
      price: number;
  }
  
  export default function EmailTemplate({
      invoiceID,
      items,
      amount,
      issuerName,
      accountNumber,
      currency,
  }: Props) {
      return (
          <Html>
              <Head />
              <Preview>Purchase Invoice from {issuerName}</Preview>
              <Tailwind>
                  <Body className="bg-white my-auto mx-auto font-sans">
                      <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                          <Section className="mt-[32px]">
                              <Heading as="h2" className="text-[#0ea5e9] text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                  Purchase Invoice from {issuerName}
                              </Heading>
                              <Text className="text-black text-[14px] leading-[24px]">
                                  Invoice No: INV0{invoiceID}
                              </Text>
                              <Heading as="h3" className="text-black text-[18px] font-bold mt-[24px]">
                                  Payment Details:
                              </Heading>
                              <Text className="text-black text-[14px] leading-[24px]">
                                  Account Details: {issuerName}
                              </Text>
                              <Text className="text-black text-[14px] leading-[24px]">
                                  Account Number: {accountNumber}
                              </Text>
                              <Text className="text-black text-[14px] leading-[24px]">
                                  Total Amount: {currency}{amount}
                              </Text>
                              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                              <Heading as="h3" className="text-black text-[18px] font-bold mt-[24px]">
                                  Items:
                              </Heading>
                              {items && items.map((item, index) => (
                                  <Text key={index} className="text-black text-[14px] leading-[24px]">
                                      {item.cost} x {item.quantity} = {item.price}
                                  </Text>
                              ))}
                          </Section>
                      </Container>
                  </Body>
              </Tailwind>
          </Html>
      );
  }