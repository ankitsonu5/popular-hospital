const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");

async function test() {
  try {
    const form = new FormData();
    form.append("title", "Test News Title");
    form.append("slug", "test-news-slug-" + Date.now());
    form.append("date", "2026-03-16");
    form.append("isActive", "true");
    form.append("content", '["test paragraph"]');

    // Create dummy files
    fs.writeFileSync("dummy1.jpg", "fake image content 1");
    fs.writeFileSync("dummy2.jpg", "fake image content 2");

    // Attach gallery files
    form.append("gallery", fs.createReadStream("dummy1.jpg"));
    form.append("gallery", fs.createReadStream("dummy2.jpg"));

    // NOTE: I am deliberately not sending 'image' to see if it causes an issue, because the user might just be updating gallery or creating one without 'image' (though 'image' is required). Let's see. Let's provide 'image' since it's required.
    form.append("image", fs.createReadStream("dummy1.jpg"));

    console.log("Sending request...");
    const res = await fetch("http://localhost:5100/api/cms/news", {
      method: "POST",
      headers: {
        "x-cms-key": "popular-hospital-cms-dev",
      },
      body: form,
    });

    const text = await res.text();
    console.log("Status: ", res.status);
    console.log("Response: ", text);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
