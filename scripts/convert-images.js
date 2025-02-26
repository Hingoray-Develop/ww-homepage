const fs = require("fs");
const path = require("path");

// 변환할 이미지 파일 목록
const images = [
  { name: "blackwhale", path: "./public/images/logo/blackwhale.png" },
  { name: "stamp", path: "./public/images/logo/stamp.png" },
  { name: "warning", path: "./public/images/logo/warning.png" },
  { name: "calendar", path: "./public/images/logo/calendar.png" },
  { name: "money", path: "./public/images/logo/money.png" },
];

// 각 이미지를 Base64로 변환
images.forEach((image) => {
  try {
    const imageData = fs.readFileSync(image.path);
    const base64Data = imageData.toString("base64");
    console.log(`const ${image.name}Base64 = "${base64Data}";`);
  } catch (error) {
    console.error(`Error converting ${image.name}: ${error.message}`);
  }
});
