"use client"

import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image'
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';

interface InputFileProps {
  // You can add any additional props needed
}

export function InputFile(props: InputFileProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];


    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid w-[300px] h-[168px] items-center gap-1.5 relative">
      <Input className='cursor-pointer absolute top-0 bottom-0 right-0 left-0 w-full h-full opacity-0' id="picture" type="file" accept="image/*" onChange={handleFileChange} />
      <Button variant="outline" className="absolute top-0 bottom-0 right-0 left-0 pointer-events-none w-full h-full">
        Выберите превью
      </Button>
      {selectedFile && (
        <div>
          <img
            src={selectedFile}
            alt="Preview"
            className='object-cover w-[300px] h-[168px] bg-muted rounded-lg z-50 relative pointer-events-none'
            width={300}
            height={168}
          />
        </div>
      )}
    </div>
  );
}