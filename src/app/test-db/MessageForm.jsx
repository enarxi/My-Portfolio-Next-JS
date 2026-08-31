'use client';

import { useRef } from 'react';

export default function MessageForm({ addMessage }) {
  const formRef = useRef(null);

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await addMessage(formData);
        formRef.current?.reset(); // Clears the input after submission
      }} 
      className="flex flex-col gap-3"
    >
      <textarea 
        name="content"
        required
        rows={3}
        placeholder="Type a test message here..."
        className="w-full p-3 bg-bg border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-fg placeholder:text-muted"
      />
      <button type="submit" className="self-end px-5 py-2.5 bg-primary hover:opacity-80 text-bg rounded-lg shadow transition font-medium">
        Add to Database
      </button>
    </form>
  );
}
