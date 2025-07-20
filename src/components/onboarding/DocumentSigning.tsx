import React from "react";
import { Card, Button, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";

const documents = [
  { id: "contract", name: "Employment Contract", signed: false },
  { id: "nda", name: "Non-Disclosure Agreement", signed: false },
  { id: "asset", name: "Asset Form", signed: false },
];

export const DocumentSigning: React.FC = () => {
  const [docs, setDocs] = React.useState(documents);

  const handleSign = (id: string) => {
    setDocs(prevDocs =>
      prevDocs.map(doc =>
        doc.id === id ? { ...doc, signed: true } : doc
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Document Signing</h2>
      {docs.map(doc => (
        <Card key={doc.id} className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Checkbox isSelected={doc.signed} isReadOnly />
              <span className="ml-2">{doc.name}</span>
            </div>
            <Button
              size="sm"
              color={doc.signed ? "success" : "primary"}
              onPress={() => handleSign(doc.id)}
              disabled={doc.signed}
              className={doc.signed 
                ? "bg-green-500 text-white rounded-full" 
                : "border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50 rounded-full"
              }
            >
              {doc.signed ? "Signed" : "Sign Document"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};