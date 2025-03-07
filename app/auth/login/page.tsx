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
  UserLoginFormData,
  userLoginSchema,
} from "@/lib/zod/schemas/userLoginSchema";
import { useAuth } from "@/providers/Auth/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { CheckCircle, CheckCircle2Icon, Circle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { showErrorToast, showInfoToast } from "@/components/CustomToast";

export default function Login() {
  const { login, isAuthenticated, pendingLogin } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginSchema),
  });
  const [keepSignIn, setKeepSignIn] = useState(false);

  const onSuccess: SubmitHandler<UserLoginFormData> = async (data) => {
    showInfoToast("Logging in...");
    await login(data);
  };

  const onError = () => {
    showErrorToast("Form fields are invalid");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login to Paggo OCR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSuccess, onError)}
            className="space-y-4"
          >
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
            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
            <Button
              type="submit"
              className="w-full bg-accent text-primary font-semibold hover:text-primary-foreground hover:border-2"
              onClick={handleSubmit(onSuccess, onError)}
              disabled={pendingLogin}
            >
              <LogIn strokeWidth={4} />
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter>
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
            <Button
              className="flex justify-center mx-2 items-center motion-ease-spring-bouncier"
              onClick={() => setKeepSignIn((prev) => !prev)}
            >
              {keepSignIn ? (
                <CheckCircle className="motion-preset-pop" />
              ) : (
                <Circle className="motion-preset-pop" />
              )}
              <label>Remember me</label>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
