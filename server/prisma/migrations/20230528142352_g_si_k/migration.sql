-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "roomjoined" TEXT[],

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
    "members" TEXT[],

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "room_id_key" ON "room"("id");
