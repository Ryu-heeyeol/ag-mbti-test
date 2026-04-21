import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

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

        console.log("Reading image with Jimp v1...");
        const image = await Jimp.read(imagePath);
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const cellW = Math.floor(width / 4);
        const cellH = Math.floor(height / 4);

        console.log(`Grid size: ${width}x${height}, Cell: ${cellW}x${cellH}`);

        for (let i = 0; i < mbtiList.length; i++) {
            const mbti = mbtiList[i];
            const row = Math.floor(i / 4);
            const col = i % 4;
            
            const x = col * cellW;
            const y = row * cellH;

            console.log(`Processing ${mbti}...`);
            const charImg = image.clone().crop({ x, y, w: cellW, h: cellH });
            await charImg.write(path.join(outputDir, `mbti_${mbti}.png`));
        }
        console.log("All 16 images have been successfully split and saved!");
    } catch (err) {
        console.error("Splitting failed:", err);
    }
}

split();
