import { User } from "../stores/user";

type isLoggedInUserRegisteredProps = {
  users: User[];
  email: string;
};

export default function isLoggedInUserRegistered({
  users,
  email,
}: isLoggedInUserRegisteredProps): boolean {
  return users.some((user) => user.email === email);
}
