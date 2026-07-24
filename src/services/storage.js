import { supabase } from "./supabase";

/**
 * Upload Event Image
 */
export const uploadEventImage = async (file) => {
  if (!file) return { data: null, error: "No file selected" };

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const filePath = `events/${fileName}`;

  const { error } = await supabase.storage
    .from("event-assets")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { data: null, error };
  }

  const { data } = supabase.storage
    .from("event-assets")
    .getPublicUrl(filePath);

  return {
    data: {
      path: filePath,
      publicUrl: data.publicUrl,
    },
    error: null,
  };
};

/**
 * Upload Payment QR
 */
export const uploadQrImage = async (file) => {
  if (!file) return { data: null, error: "No file selected" };

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const filePath = `qr/${fileName}`;

  const { error } = await supabase.storage
    .from("event-assets")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { data: null, error };
  }

  const { data } = supabase.storage
    .from("event-assets")
    .getPublicUrl(filePath);

  return {
    data: {
      path: filePath,
      publicUrl: data.publicUrl,
    },
    error: null,
  };
};

/**
 * Delete file from Storage
 */
export const deleteStorageFile = async (filePath) => {
  if (!filePath) return;

  const { error } = await supabase.storage
    .from("event-assets")
    .remove([filePath]);

  return error;
};

/**
 * Get Public URL
 */
export const getStorageUrl = (filePath) => {
  if (!filePath) return "";

  const { data } = supabase.storage
    .from("event-assets")
    .getPublicUrl(filePath);

  return data.publicUrl;
};

/**
 * Validate image
 */
export const validateImage = (file) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return "Only JPG, JPEG, PNG and WEBP images are allowed.";
  }

  if (file.size > maxSize) {
    return "Image size should be less than 5MB.";
  }

  return null;
};