"use client";
import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useLogin, useSignup } from "@/services/apiHooks";
import { TLoginPayload, TSignupPayload } from "@/types/payloads";
import { handleLogin } from "@/services/actions";
import { useAuthStore } from "@/stores/useAuthStore";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface AuthDialogProps {
  openAuthDialog: boolean;
  setOpenAuthDialog: React.Dispatch<React.SetStateAction<boolean>>;
  authType: "login" | "signup";
  setAuthType: React.Dispatch<React.SetStateAction<"login" | "signup">>;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  openAuthDialog,
  setOpenAuthDialog,
  authType,
  setAuthType,
}) => {
  const signup = useSignup();
  const login = useLogin();

  const formSchema = authType === "login" ? loginSchema : signupSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(authType === "signup" ? { confirmPassword: "", username: "" } : {}),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (authType === "login") {
      login.mutate(values as TLoginPayload, {
        onSuccess: (response) => {
          toast.success("Logged in successfully!");
          handleLogin(response.user.pk, response.access, response.refresh);
          useAuthStore.getState().refreshUserId();
          setOpenAuthDialog(false);
        },
        // eslint-disable-next-line
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ?? "Login failed. Please try again.";
          toast.error(message);
        },
      });
    } else {
      signup.mutate(values as TSignupPayload, {
        onSuccess: (response) => {
          toast.success("Account created successfully!");
          handleLogin(response.user.pk, response.access, response.refresh);
          useAuthStore.getState().refreshUserId();
          setOpenAuthDialog(false);
        },
        // eslint-disable-next-line
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ??
            "Signup failed. Please try again.";
          toast.error(message);
        },
      });
    }
  }

  return (
    <Dialog open={openAuthDialog} onOpenChange={setOpenAuthDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {authType === "login" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {authType === "login"
              ? "Sign in to your Staylio account"
              : "Join Staylio to start booking your next stay"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {authType === "signup" && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {authType === "signup" && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600"
            >
              {authType === "login" ? "Login" : "Create Account"}
            </Button>

            {authType === "login" ? (
              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-red-500"
                  onClick={() => setAuthType("signup")}
                >
                  Sign up
                </Button>
              </p>
            ) : (
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-red-500"
                  onClick={() => setAuthType("login")}
                >
                  Sign in
                </Button>
              </p>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
