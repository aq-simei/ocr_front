import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type LoginRequiredContentProps = {
  title?: string;
};
export const LoginRequiredContent = ({ title }: LoginRequiredContentProps) => {
  const router = useRouter();
  return (
    <div className="space-y-6 text-center w-full">
      <div>
        <h1 className="text-xl font-semibold text-primary-foreground">
          {title || "Login Required"}
        </h1>
        <div className="w-full justify-between">
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?
            <Button
              variant="link"
              className="text-primary-foreground"
              onClick={() => router.push("/auth/signup")}
            >
              Sign up now!
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};
