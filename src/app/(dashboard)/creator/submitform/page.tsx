"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Upload } from "lucide-react";

const formSchema = z.object({
  bidAmount: z.string().min(1, "Bid amount is required"),
  estimatedTimeline: z.string().min(1, "Timeline is required"),
  message: z.string().max(500, "Message must be 500 characters or less"),
  files: z.any().optional(),
});

interface SubmitBidFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmitBidForm({ open, onOpenChange }: SubmitBidFormProps) {
  const [characterCount, setCharacterCount] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bidAmount: "",
      estimatedTimeline: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onOpenChange(false);
    form.reset();
    setCharacterCount(0);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Your Bid</DialogTitle>
          <DialogDescription>
            Enter the details for your campaign bid. Your offer will be reviewed
            by the brand.
          </DialogDescription>
        </DialogHeader>

        {/* 👇 Only the form area has animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Bid Amount */}
              <FormField
                control={form.control}
                name="bidAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bid Amount</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="pl-7"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          USD
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Estimated Timeline */}
              <FormField
                control={form.control}
                name="estimatedTimeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Timeline</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., 2024-07-25 to 2025-09-05"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message to Brand</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell the brand why you're the perfect creator..."
                        className="min-h-[100px] resize-none"
                        maxLength={500}
                        onChange={(e) => {
                          field.onChange(e);
                          setCharacterCount(e.target.value.length);
                        }}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {characterCount}/500 characters
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <FormField
                control={form.control}
                name="files"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Portfolio/Documents (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="file"
                          multiple
                          onChange={(e) => onChange(e.target.files)}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border bg-background p-6 transition-colors hover:bg-accent/50"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <div className="text-center">
                            <p className="text-sm font-medium">
                              Drag & drop files or click to upload
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Upload relevant portfolio pieces or documents
                            </p>
                          </div>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onOpenChange(false);
                    form.reset();
                    setCharacterCount(0);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Bid</Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
