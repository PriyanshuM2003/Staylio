"use client";
import { useState, useRef } from "react";
import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProperty, useUploadPropertyImage } from "@/hooks/api-hooks";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const propertyFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters." }),
  price_per_night: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  bedrooms: z.coerce
    .number()
    .int()
    .positive({ message: "Bedrooms must be a positive number." }),
  bathrooms: z.coerce
    .number()
    .int()
    .positive({ message: "Bathrooms must be a positive number." }),
  guests: z.coerce
    .number()
    .int()
    .positive({ message: "Guests must be a positive number." }),
  country: z.string().min(2, { message: "Country is required." }),
  state: z.string().min(1, { message: "State is required." }),
  category: z.string().min(1, { message: "Category is required." }),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const categories = [
  "Apartment",
  "House",
  "Cabin",
  "Villa",
  "Condo",
  "Cottage",
  "Townhouse",
  "Other",
];

export default function AddProperty() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageUpload, setCurrentImageUpload] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createPropertyMutation = useCreateProperty();
  const uploadImageMutation = useUploadPropertyImage();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price_per_night: 0,
      bedrooms: 1,
      bathrooms: 1,
      guests: 1,
      country: "",
      state: "",
      category: "",
    },
  });

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);

    // Generate preview URLs
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrls((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e.target.files);
    // Reset the input value so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (propertyId: string) => {
    setTotalImages(images.length);

    for (let i = 0; i < images.length; i++) {
      setCurrentImageUpload(i + 1);

      try {
        await uploadImageMutation.mutateAsync({
          property: propertyId,
          image: images[i],
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(`Failed to upload image ${i + 1}`);
      }
    }
  };

  async function onSubmit(data: PropertyFormValues) {
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsSubmitting(true);

    try {
      // First submit property data
      const response = await createPropertyMutation.mutateAsync(data);

      if (response && response.success) {
        // Then upload images one by one
        await uploadImages(response.id);

        toast.success("Property added successfully");

        // Reset form and state
        form.reset();
        setImages([]);
        setImagePreviewUrls([]);
      }
      // eslint-disable-next-line
    } catch (error: any) {
      console.error("Error submitting property:", error);

      // Handle error response from the API
      if (error.response?.data?.errors) {
        try {
          const errorData = JSON.parse(error.response.data.errors);
          const errorMessages = Object.entries(errorData)
            // eslint-disable-next-line
            .map(([field, errors]: [string, any]) => {
              const fieldErrors = errors
                // eslint-disable-next-line
                .map((err: any) => err.message)
                .join(", ");
              return `${field}: ${fieldErrors}`;
            })
            .join("\n");

          toast.error(errorMessages);
          // eslint-disable-next-line
        } catch (e) {
          toast("Failed to add property");
        }
      } else {
        toast.error("Failed to add property");
      }
    } finally {
      setIsSubmitting(false);
      setCurrentImageUpload(0);
      setTotalImages(0);
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Cozy Beach House" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your property..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price_per_night"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Per Night ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Guests</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <FormLabel>Property Images</FormLabel>
                  <FormDescription>
                    Upload multiple images of your property (max 10)
                  </FormDescription>

                  {/* Integrated Image Upload */}
                  <div className="mt-2">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors hover:border-gray-400">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                        multiple
                        disabled={images.length >= 10 || isSubmitting}
                      />
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2 text-center">
                        Drag and drop your images here or click to browse
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleImageClick}
                        disabled={images.length >= 10 || isSubmitting}
                      >
                        Select Images
                      </Button>
                    </div>
                  </div>
                </div>

                {imagePreviewUrls.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Image Previews</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden border">
                            <Image
                              src={url || "/placeholder.svg"}
                              alt={`Property image ${index + 1}`}
                              width={200}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-90 hover:opacity-100 transition-opacity"
                            disabled={isSubmitting}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isSubmitting && totalImages > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading image {currentImageUpload} of {totalImages}...
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  "Add Property"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
