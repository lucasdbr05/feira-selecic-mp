/*
  Warnings:

  - You are about to alter the column `latitude` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `longitude` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `latitude` on the `Fair` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `longitude` on the `Fair` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    CONSTRAINT "Client_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("cep", "id", "latitude", "longitude") SELECT "cep", "id", "latitude", "longitude" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Fair" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);
INSERT INTO "new_Fair" ("cep", "id", "latitude", "longitude", "name") SELECT "cep", "id", "latitude", "longitude", "name" FROM "Fair";
DROP TABLE "Fair";
ALTER TABLE "new_Fair" RENAME TO "Fair";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "refreshToken", "role", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "refreshToken", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
