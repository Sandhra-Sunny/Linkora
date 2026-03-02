-- CreateIndex
CREATE UNIQUE INDEX "Url_originalUrl_shortCode_key" ON "Url"("originalUrl" DESC, "shortCode" DESC);
