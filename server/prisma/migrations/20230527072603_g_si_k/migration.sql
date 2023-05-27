-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "account" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "createdad" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "due" TEXT NOT NULL,
    "ispurchased" BOOLEAN NOT NULL DEFAULT false,
    "isclosed" BOOLEAN NOT NULL DEFAULT false,
    "iscompleted" BOOLEAN NOT NULL DEFAULT false,
    "isrecieved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_roomTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "room_id_key" ON "room"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_roomTouser_AB_unique" ON "_roomTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_roomTouser_B_index" ON "_roomTouser"("B");

-- AddForeignKey
ALTER TABLE "_roomTouser" ADD CONSTRAINT "_roomTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roomTouser" ADD CONSTRAINT "_roomTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
