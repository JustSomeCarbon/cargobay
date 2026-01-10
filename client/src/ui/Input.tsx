type UpdateInputEmail = (text: string) => void;

export default function Input({ updateEmail, email } : { updateEmail: UpdateInputEmail, email: string }) {

  return (
    <div>
      <input
        className="border border-gray-600 rounded px-2 py-1"
        type="text"
        value={email}
        onChange={(e) =>  { 
          updateEmail(e.target.value);
        }}
      />
    </div>
  );
}
