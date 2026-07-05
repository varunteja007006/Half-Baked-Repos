"use client";
import { Card } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

function Main() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<Inputs>();

  const { toast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const resp = await new Promise((resolve) => {
        setTimeout(() => {
          resolve("All okay");
        }, 2000);
      });

      toast({
        title: "Success",
        variant: "success",
      });

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="p-5 w-[18rem] md:w-[22rem]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              className="py-3 px-2 text-black rounded-md border dark:text-white focus:ring focus:ring-blue-400 dark:focus:ring-purple-800 focus:outline-none"
              placeholder="Enter username"
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
            />
          </div>
          {errors.username && (
            <div className="text-red-500">{`${errors.username.message}`}</div>
          )}
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="py-3 px-2 text-black rounded-md border dark:text-white focus:ring focus:ring-blue-400 dark:focus:ring-purple-800 focus:outline-none"
              placeholder="Enter password"
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 10,
                  message: "Password must have minimum length of 10",
                },
              })}
            />
          </div>
          {errors.password && (
            <span className="text-red-500">{`${errors.password.message}`}</span>
          )}
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="py-3 px-2 text-black rounded-md border dark:text-white focus:ring focus:ring-blue-400 dark:focus:ring-purple-800 focus:outline-none"
              placeholder="Re-enter password"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500">{`${errors.confirmPassword.message}`}</span>
          )}
        </div>

        <button
          type="submit"
          className="py-2 px-4 text-black uppercase bg-yellow-300 w-fit focus:ring focus:ring-blue-400 dark:focus:ring-purple-800 focus:outline-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? ` Submitting...` : `Submit`}
        </button>
      </form>
    </Card>
  );
}

export default Main;
