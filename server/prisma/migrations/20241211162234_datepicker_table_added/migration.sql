-- AlterTable
CREATE SEQUENCE datepicker_id_seq;
ALTER TABLE "Datepicker" ALTER COLUMN "id" SET DEFAULT nextval('datepicker_id_seq');
ALTER SEQUENCE datepicker_id_seq OWNED BY "Datepicker"."id";
