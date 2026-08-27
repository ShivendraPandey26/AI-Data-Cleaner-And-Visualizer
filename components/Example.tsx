"use client";

import { useState } from "react";

type Example = {
  id: number;
  title: string;
  description: string;
  issues: string[];
  data: string;
};

const examples: Example[] = [
  {
    id: 1,
    title: "Employee Records",
    description:
      "Employee CSV containing duplicates, missing values, invalid emails, inconsistent cities, and extra spaces.",
    issues: [
      "Duplicate records",
      "Missing values",
      "Invalid emails",
      "Inconsistent capitalization",
      "Extra spaces",
    ],
    data: `id,Name,Age,Email,Phone,City,Salary,Join_Date
101," Rahul Sharma ",24,rahul @ gmail.com,98765 43210,raipur,"35,000",12-03-2024
102,Priya  Singh,"twenty five",priya.singh@gmail, +91-9988776655,RAIPUR,42k,2024/04/15
103,"Amit Kumar",27,amit@gmail,998877665,Bhilai,"Rs. 38,500",15/05/24
104,Neha,-5,neha @yahoo.com,91234-56789," bilaspur ","40000 INR",June 2 2024
101,"Rahul Sharma",24,rahul@gmail.com,9876543210,Raipur,35000,2024-03-12`,
  },

  {
    id: 2,
    title: "Customer Data",
    description:
      "Customer information with inconsistent names, phone numbers, emails, cities, and missing values.",
    issues: [
      "Invalid emails",
      "Inconsistent phone numbers",
      "Extra spaces",
      "Missing values",
      "Capitalization",
    ],
    data: `Customer_ID,Name,Email,Phone,City,Age
C001," Rahul Sharma ",rahul@gmail.com,9876543210,raipur,24
C002,Priya Singh,priya@gmail,+91 9988776655,RAIPUR,
C003,"Amit  Kumar",amit @gmail.com,99887 76655,Bhilai,"27 years"
C004,Neha Verma,N/A,91234-56789," bilaspur ",29
C005,Rohit Sharma,rohit@yahoo,09876543210,BHILAI,twenty five
C006," Rahul Sharma ",rahul@gmail.com,9876543210,Raipur,24`,
  },

  {
    id: 3,
    title: "Salary Records",
    description:
      "Payroll data containing mixed salary formats, invalid numbers, missing values, and inconsistent employee information.",
    issues: [
      "Mixed salary formats",
      "Wrong data types",
      "Invalid values",
      "Missing values",
      "Extra spaces",
    ],
    data: `Employee_ID,Name,Age,Department,Salary,Joining_Date
201," Rahul Sharma ",24,Engineering,40000,12-03-2024
202,Priya Singh,25,Engineering,40k,2024/04/15
203,"Amit Kumar",27,Sales,"Rs. 38,500",15/05/24
204,Neha,-5,HR,"40000 INR",June 2 2024
205,"Vikas  Patel","thirty",Finance,$45000,N/A
206,Rohit,29,IT,"₹ 52,000","2024-07-21"
207,"Priya Singh",25,Engineering,42000,2024-04-15`,
  },

  {
    id: 4,
    title: "Product Inventory",
    description:
      "Inventory data with inconsistent prices, quantities, categories, dates, and product names.",
    issues: [
      "Mixed number formats",
      "Inconsistent capitalization",
      "Missing values",
      "Invalid values",
      "Extra spaces",
    ],
    data: `Product_ID,Product_Name,Category,Quantity,Price,Stock_Date
P101," Wireless Mouse ",electronics,25,"₹1,200",12-03-2024
P102,Keyboard,ELECTRONICS,"twenty",1200,2024/04/15
P103,"USB Cable",Electronics,-5,"Rs. 500",15/05/24
P104,monitor," ELECTRONICS ",10,"$250",June 2 2024
P105,"Laptop Bag",accessories,N/A,"2,500 INR",2024-06-12
P106," wireless mouse",ELECTRONICS,25,1200,12-03-2024`,
  },

  {
    id: 5,
    title: "Complete Messy Dataset",
    description:
      "A realistic CSV combining duplicate records, invalid values, inconsistent formats, missing data, and incorrect data types.",
    issues: [
      "Duplicate records",
      "Invalid emails",
      "Mixed salary formats",
      "Inconsistent dates",
      "Invalid values",
      "Phone inconsistencies",
      "Wrong data types",
    ],
    data: `id,Name,Age,Email,Phone,City,Salary,Join_Date
101," Rahul Sharma ",24,rahul @ gmail.com,98765 43210,raipur,"35,000",12-03-2024
102,Priya  Singh,"twenty five",priya.singh@gmail, +91-9988776655,RAIPUR,42k,2024/04/15
103,"Amit Kumar",27,amit@gmail,998877665,Bhilai,"Rs. 38,500",15/05/24
104,Neha,-5,neha @yahoo.com,91234-56789," bilaspur ","40000 INR",June 2 2024
105,"Vikas Patel",29,vikas@gmail.com,9876543210,BILASPUR,$45000,2024-07-21
106,"Rohit  Kumar","30 years",rohit@gmail,09876543210," raipur ",45k,21/07/2024
107,Priya Singh,25,priya.singh@gmail.com,+91-9988776655,Raipur,42000,2024-04-15
101,"Rahul Sharma",24,rahul@gmail.com,9876543210,Raipur,35000,2024-03-12`,
  },
  {
    id: 6,
    title: "Student Records",
    description:
      "Student data containing inconsistent names, marks, grades, dates, phone numbers, and missing values.",
    issues: [
      "Missing values",
      "Wrong data types",
      "Invalid values",
      "Extra spaces",
      "Inconsistent capitalization",
      "Inconsistent dates",
    ],
    data: `Student_ID,Name,Age,Email,Phone,City,Marks,Grade,Admission_Date
S101," Rahul Sharma ",20,rahul@gmail.com,98765 43210,raipur,"85 marks",A,12-03-2024
S102,Priya  Singh,"twenty one",priya.singh@gmail,+91-9988776655,RAIPUR,92,A+,2024/04/15
S103,"Amit Kumar",19,amit @gmail.com,998877665,Bhilai,78.5,B,15/05/24
S104,Neha,-2,neha@yahoo.com,91234-56789," bilaspur ",N/A,C,June 2 2024
S105,"Vikas Patel",21,,9876543210,BILASPUR,105,A+,2024-06-21
S106,"Rohit  Kumar","22 years",rohit@gmail,09876543210," raipur ",seventy,B,21/07/2024
S107,Priya Singh,21,priya.singh@gmail.com,+91-9988776655,Raipur,92,A+,2024-04-15`,
  },
];

export default function Example() {
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);

  return (
    <>
      <section className="max-w-7xl w-full mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Messy Data Examples
          </h2>

          <p className="mt-2 text-sm text-[#8B90A3]">
            Choose a real-world dataset to evaluate how your model detects and
            cleans common data-quality issues.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 m-2">
          {examples.map((example) => (
            <button
              key={example.id}
              type="button"
              onClick={() => setSelectedExample(example)}
              className="group rounded-xl border border-[#262B38] bg-[#151822] p-5 text-left transition-all duration-200 hover:border-[#3A4152] hover:bg-[#191D28]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#202532] text-xs font-semibold text-[#C6CAD6]">
                  {String(example.id).padStart(2, "0")}
                </span>

                <span className="text-xs text-[#62697A] transition-colors group-hover:text-[#8B90A3]">
                  View example →
                </span>
              </div>

              <h3 className="text-base font-medium text-[#E6E8EE]">
                {example.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#8B90A3]">
                {example.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {example.issues.slice(0, 3).map((issue) => (
                  <span
                    key={issue}
                    className="rounded-md border border-[#262B38] bg-[#10131A] px-2 py-1 text-[11px] text-[#8B90A3]"
                  >
                    {issue}
                  </span>
                ))}

                {example.issues.length > 3 && (
                  <span className="rounded-md border border-[#262B38] bg-[#10131A] px-2 py-1 text-[11px] text-[#62697A]">
                    +{example.issues.length - 3} more
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedExample && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedExample(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-xl border border-[#262B38] bg-[#11141C] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#262B38] bg-[#151822] px-5 py-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#62697A]">
                    EXAMPLE {String(selectedExample.id).padStart(2, "0")}
                  </span>

                  <h3 className="text-base font-semibold text-[#E6E8EE]">
                    {selectedExample.title}
                  </h3>
                </div>

                <p className="mt-1 text-sm text-[#8B90A3]">
                  {selectedExample.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExample(null)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-lg text-[#8B90A3] transition-colors hover:bg-[#202532] hover:text-white"
                aria-label="Close example"
              >
                ×
              </button>
            </div>

            <div className="border-b border-[#262B38] px-5 py-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[#62697A]">
                Issues demonstrated
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedExample.issues.map((issue) => (
                  <span
                    key={issue}
                    className="rounded-md border border-[#303644] bg-[#1A1E29] px-3 py-1.5 text-xs text-[#C6CAD6]"
                  >
                    {issue}
                  </span>
                ))}
              </div>
            </div>

            <div className="max-h-[60vh] overflow-auto p-5">
              <pre className="rounded-lg border border-[#262B38] bg-[#0D1016] p-5 text-sm leading-6 text-[#C6CAD6]">
                <code>{selectedExample.data}</code>
              </pre>
            </div>

            <div className="flex justify-end border-t border-[#262B38] bg-[#151822] px-5 py-3">
              <button
                type="button"
                onClick={() => setSelectedExample(null)}
                className="rounded-lg border border-[#303644] px-4 py-2 text-sm text-[#C6CAD6] transition-colors hover:bg-[#202532] hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
