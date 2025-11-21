-- CreateTable
CREATE TABLE `user` (
    `UserID` VARCHAR(50) NOT NULL,
    `FirstName` VARCHAR(100) NOT NULL,
    `LastName` VARCHAR(100) NOT NULL,
    `DateOfBirth` DATE NOT NULL,
    `Username` VARCHAR(100) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `Role` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `unique_Username`(`Username`),
    INDEX `index_Username`(`Username`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
