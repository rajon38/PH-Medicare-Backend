/*
  Warnings:

  - Made the column `registrationNumber` on table `doctor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "doctor" ALTER COLUMN "registrationNumber" SET NOT NULL;
