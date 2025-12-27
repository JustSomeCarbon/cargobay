
type UpdateInputEmail = (text: string) => void;

export default function Input({ updateEmail, email } : { updateEmail: UpdateInputEmail, email: string }) {

  return (
    <div>
      <input type="text"
        value={email}
        onChange={(e) => updateEmail(e.target.value)}
      />
    </div>
  );
}
