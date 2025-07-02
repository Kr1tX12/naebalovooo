"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Naeb, PrismaClient } from "@/generated/prisma";
import { prisma as prismaRaw } from "@/huinya/prisma";
import { getServerSession } from "next-auth";

const prisma = prismaRaw as PrismaClient;
// используем далбаёбский язык потому что только он поддерживает server actions
// разрабы next.js, очнитесь, исправьте

export const захуяретьНаёб = async ({
  наёб,
}: {
  наёб: Omit<Naeb, "id" | "naebcikId" | "published">;
}) => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    console.log(наёб);

    if (!session.user) {
      return {
        зачёт: false,
        саабщение: "Куда палез, не авторизован",
      };
    }

    const newNaeb = await prisma.naeb.create({
      data: {
        ...наёб,
        naebcikId: session.user.id,
        published: false,
      },
    });

    return {
      зачёт: true,
      саабщение: "Наёб создан и сохранён как черновик",
      idНаёба: newNaeb.id,
    };
  } catch (error) {
    console.error(error);
    return {
      зачёт: false,
      саабщение: "Сука, не получилось, давай ещё раз попробуем, нажми. Если всё равно нихуя то пиши разрабу в лс",
    };
  }
};

export const сохранитьНаёб = async ({
  наёб,
}: {
  наёб: Omit<Naeb, "naebcikId" | "published">;
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session.user) {
      return {
        зачёт: false,
        саабщение: "Куда палез, не авторизован",
      };
    }

    await prisma.naeb.update({
      where: {
        id: наёб.id,
        naebcikId: session.user.id,
      },
      data: {
        ...наёб,
      },
    });

    return {
      зачёт: true,
      саабщение: "Наёб обновлён",
    };
  } catch (error) {
    console.error(error);
    return {
      зачёт: false,
      саабщение: "Иди нахуй, не получилось сохранить твой наёб",
    };
  }
};

export const опубликоватьНаёб = async ({ naebId }: { naebId: number }) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session.user) {
      return {
        зачёт: false,
        саабщение: "Куда палез, не авторизован",
      };
    }

    await prisma.naeb.update({
      where: {
        id: naebId,
        naebcikId: session.user.id,
      },
      data: {
        published: true,
      }
    });

    return {
      зачёт: true,
      саабщение: "Наёб опубликован",
    };
  } catch (error) {
    console.error(error);
    return {
      зачёт: false,
      саабщение: "Иди нахуй, не получилось опубликовать твой наёб",
    };
  }
};
