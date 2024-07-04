import { createGroup } from "./actions";

export default function CreateGroup() {
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" required />
      <button formAction={createGroup}>Create Group</button>
    </form>
  );
}
