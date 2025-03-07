"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  UserSignUpFormData,
  userSignUpFormSchema,
} from "@/lib/zod/schemas/userSignUpSchema";
import { Label } from "@radix-ui/react-label";
import { SquareArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { useCreateUser } from "@/hooks/useCreateUser";
import { useAuth } from "@/providers/Auth/AuthProvider";
export default function SignUp() {
  // const { isAuthenticated, login, logout } = useAuth();
  const { createUser } = useCreateUser();
  const { login } = useAuth();
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<UserSignUpFormData>({
    resolver: zodResolver(userSignUpFormSchema),
  });

  const handleSubmitForm: SubmitHandler<UserSignUpFormData> = async (data) => {
    const { name, email, password } = data;
    const formData = {
      name,
      email,
      password,
    };
    const res = await createUser(formData);
    if (res) {
      toast.success("Account created successfully!");
      login({ email, password });
      router.push("/");
    }
  };

  const onError = () => {
    toast.warning("There are a few problems with the form!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up to Paggo OCR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleSubmitForm, onError)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="Username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Eg: JohnDoe123"
                required
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password Confirmation</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
            <Button
              className="w-full bg-accent text-primary font-semibold hover:text-primary-foreground hover:border-2"
              onClick={handleSubmit(handleSubmitForm, onError)}
            >
              <SquareArrowUp strokeWidth={3} />
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full justify-between">
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?
              <Button
                variant="link"
                className="text-primary-foreground"
                onClick={() => router.push("/auth/login")}
              >
                Login now!
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}
