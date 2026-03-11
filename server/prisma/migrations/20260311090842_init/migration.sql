-- CreateTable
CREATE TABLE "HousingUnit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Occupant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "housingUnitId" INTEGER NOT NULL,
    "occupantId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Assignment_housingUnitId_fkey" FOREIGN KEY ("housingUnitId") REFERENCES "HousingUnit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Assignment_occupantId_fkey" FOREIGN KEY ("occupantId") REFERENCES "Occupant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Occupant_email_key" ON "Occupant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_occupantId_key" ON "Assignment"("occupantId");

-- CreateIndex
CREATE INDEX "Assignment_housingUnitId_idx" ON "Assignment"("housingUnitId");
