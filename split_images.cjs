const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const imagePath = "C:\\Users\\user\\.gemini\\antigravity\\brain\\53db62d2-d91e-435a-bb9a-5fe7b7e9d28d\\mbti_character_grid_final_1776760514281.png";
const outputDir = "d:\\Private\\antigravity\\agtest5\\public";

const mbtiList = [
    "ISTJ", "ISFJ", "INFJ", "INTJ",
    "ISTP", "ISFP", "INFP", "INTP",
    "ESTP", "ESFP", "ENFP", "ENTP",
    "ESTJ", "ESFJ", "ENFJ", "ENTJ"
];

async function split() {
    try {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log("Reading image...");
        const image = await Jimp.read(imagePath);
        const { width, height } = image.bitmap;
        const cellW = Math.floor(width / 4);
        const cellH = Math.floor(height / 4);

        console.log(`Image size: ${width}x${height}, Cell size: ${cellW}x${cellH}`);

        for (let i = 0; i < mbtiList.length; i++) {
            const mbti = mbtiList[i];
            const row = Math.floor(i / 4);
            const col = i % 4;
            
            const x = col * cellW;
            const y = row * cellH;

            console.log(`Cropping ${mbti} at (${x}, ${y})`);
            // clone() is not always needed but safer with jimp
            const clone = image.clone().crop(x, y, cellW, cellH);
            await clone.writeAsync(path.join(outputDir, `mbti_${mbti}.png`));
        }
        console.log("Successfully split all 16 images!");
    } catch (err) {
        console.error("Error during image splitting:", err);
    }
}

split();
