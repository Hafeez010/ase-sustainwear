-- CreateTable
CREATE TABLE `donation` (
    `DonationID` VARCHAR(50) NOT NULL,
    `Name` VARCHAR(100) NOT NULL,
    `Phone` VARCHAR(20) NULL,
    `Type` VARCHAR(100) NOT NULL,
    `Condition` VARCHAR(50) NOT NULL,
    `Description` TEXT NULL,
    `Quantity` INTEGER NOT NULL DEFAULT 1,
    `Status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `SubmittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UserID` VARCHAR(50) NULL,

    PRIMARY KEY (`DonationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory` (
    `InventoryID` VARCHAR(50) NOT NULL,
    `Category` VARCHAR(100) NOT NULL,
    `Condition` VARCHAR(50) NOT NULL,
    `Quantity` INTEGER NOT NULL DEFAULT 1,
    `Status` VARCHAR(191) NOT NULL DEFAULT 'Available',
    `SourceDonationID` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`InventoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `distribution` (
    `DistributionID` VARCHAR(50) NOT NULL,
    `InventoryID` VARCHAR(50) NOT NULL,
    `Recipient` VARCHAR(100) NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`DistributionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `systemLog` (
    `LogID` VARCHAR(50) NOT NULL,
    `UserID` VARCHAR(50) NULL,
    `Action` VARCHAR(255) NOT NULL,
    `Status` VARCHAR(50) NOT NULL,
    `Timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`LogID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `donation` ADD CONSTRAINT `donation_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_SourceDonationID_fkey` FOREIGN KEY (`SourceDonationID`) REFERENCES `donation`(`DonationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distribution` ADD CONSTRAINT `distribution_InventoryID_fkey` FOREIGN KEY (`InventoryID`) REFERENCES `inventory`(`InventoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `systemLog` ADD CONSTRAINT `systemLog_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;
