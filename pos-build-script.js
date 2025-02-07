const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const appName = packageJson.name;
const distPath = path.join(__dirname, "dist");
const protheusDistPath = path.join(distPath, "protheus_dist");
const appDistPath = path.join(protheusDistPath, appName);
const zipFilePath = path.join(protheusDistPath, `${appName}.app`);
const destinationPath = path.join("Backend Protheus", `${appName}.app`);

console.log(`App name set to: ${appName}`);

// Remove the protheus_dist directory if it exists
if (fs.existsSync(protheusDistPath)) {
  fs.rmSync(protheusDistPath, { recursive: true, force: true });
}

// Create the protheus_dist directory
fs.mkdirSync(protheusDistPath, { recursive: true });

// Copy the browser folder to the app name folder
fs.mkdirSync(appDistPath, { recursive: true });
fs.cpSync(path.join(distPath, appName, "browser"), appDistPath, {
  recursive: true,
});

// Create a file to stream archive data to
const output = fs.createWriteStream(zipFilePath);
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level
});

output.on("close", function () {
  console.log(`Zipped ${appName} to ${destinationPath}`);
  // Copy the zipped file to the destination folder
  fs.copyFileSync(zipFilePath, destinationPath);
});

archive.on("error", function (err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Append files from the appDistPath directory
archive.directory(appDistPath, appName);

// Finalize the archive (i.e. we are done appending files but streams have to finish yet)
archive.finalize();
