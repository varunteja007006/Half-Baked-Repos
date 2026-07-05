import * as React from "react";
import contactData from "@/app/_components/home/data/contactData";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function ContactMe() {
  return (
    <section id="contact-me" className="space-y-4">
      <h3 className="text-xl font-semibold">Contact Me</h3>

      <Card className="p-2">
        <Table>
          <TableBody>
            {contactData.map((item) => {
              return (
                <TableRow key={item.id} className="border-none ">
                  <TableCell className="font-medium capitalize">
                    {item.contact_type}
                  </TableCell>
                  <TableCell>
                    <a href={item.contact_href}>{item.contact_value}</a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
