export async function uploadToBunny(file: File): Promise<string> {
  const BUNNY_STORAGE_ZONE = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE!;
  const BUNNY_STORAGE_PASSWORD = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE_PASSWORD!;
  const BUNNY_PULL_ZONE_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE_HOSTNAME!;

  if (!BUNNY_STORAGE_ZONE || !BUNNY_STORAGE_PASSWORD || !BUNNY_PULL_ZONE_HOSTNAME) {
    //console.error("❌ Missing Bunny environment variables.");
    throw new Error("Configuration error. Bunny environment variables are not set.");
  }

  const ext = file.name.split('.').pop() || 'bin';
  const uniqueName = `${crypto.randomUUID()}.${ext}`;
  const uploadUrl = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${uniqueName}`;

//   console.log("📦 Uploading to:", uploadUrl);
//   console.log("📁 File info:", {
//     name: file.name,
//     type: file.type,
//     sizeMB: (file.size / (1024 * 1024)).toFixed(2),
//   });

  const buffer = await file.arrayBuffer();

  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      AccessKey: BUNNY_STORAGE_PASSWORD,
      'Content-Type': 'application/octet-stream',
    },
    body: buffer,
  });

  if (!res.ok) {
    const errorText = await res.text();
    // console.error("❌ Bunny upload failed:", {
    //   status: res.status,
    //   statusText: res.statusText,
    //   response: errorText,
    // });
    throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  }

  const finalUrl = `https://smallfiles.fun/file/${uniqueName}`;
  //console.log("✅ Upload success. File URL:", finalUrl);

  return finalUrl;
}
