"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2),
  organization: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm({locale}: {locale: "id" | "en"}) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<FormValues>({resolver: zodResolver(formSchema)});

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setDone(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border bg-background p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Input {...register("name")} placeholder={locale === "id" ? "Nama lengkap" : "Full name"} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <Input {...register("organization")} placeholder={locale === "id" ? "Organisasi / perusahaan" : "Organization / company"} />
          {errors.organization && <p className="mt-1 text-xs text-red-600">{errors.organization.message}</p>}
        </div>
      </div>
      <div>
        <Input {...register("email")} type="email" placeholder="Email" />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <Textarea {...register("message")} rows={5} placeholder={locale === "id" ? "Ceritakan kebutuhan kolaborasi Anda" : "Tell us about your collaboration needs"} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (locale === "id" ? "Mengirim..." : "Sending...") : locale === "id" ? "Kirim pesan" : "Send message"}
      </Button>
      {done && (
        <p className="text-sm text-emerald-600">
          {locale === "id"
            ? "Demo form berhasil dikirim. Sambungkan ke email/CRM lewat env saat production."
            : "Demo form submitted successfully. Connect it to email/CRM via env in production."}
        </p>
      )}
    </form>
  );
}
