-- CreateTable
CREATE TABLE `_RelatedChores` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RelatedChores_AB_unique`(`A`, `B`),
    INDEX `_RelatedChores_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RelatedChores` ADD CONSTRAINT `_RelatedChores_A_fkey` FOREIGN KEY (`A`) REFERENCES `Chore`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RelatedChores` ADD CONSTRAINT `_RelatedChores_B_fkey` FOREIGN KEY (`B`) REFERENCES `Chore`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
