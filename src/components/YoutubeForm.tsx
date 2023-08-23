import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface FormValues {
  username: string;
  email: string;
  channel: string;
  social: {
    github: string;
    linkedin: string;
  };
}

export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Yash",
    },
    /*

    Async default values - 

    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "Yash",
        email: data.email,
        channel:''
      };
    },

    */
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  console.log("rendering form");

  const onSubmit = (data: FormValues) => {
    console.log({ ...data });
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: { value: true, message: "Username is required" },
            validate: (formValue) => {
              return formValue !== "admin" || "Enter a different name";
            },
          })}
        />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: { value: true, message: "Channel is required" },
            validate: {
              notAdmin: (formValue) => {
                return (
                  formValue !== "admin" || "Enter a different channel name"
                );
              },
              notBlacklist: (formValue) => {
                return formValue !== "blacklist" || "Can't allow blacklist";
              },
            },
          })}
        />
        <p className="error">{errors.channel?.message}</p>

        <label htmlFor="github">Github</label>
        <input type="url" id="github" {...register("social.github")} />

        <label htmlFor="linkedin">linkedin</label>
        <input type="url" id="linkedin" {...register("social.linkedin")} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
