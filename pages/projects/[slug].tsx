import { Fragment } from "react";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Text from "@/components/Text";
import Media from "@/components/Media";
import Back from "@/components/Back";
import { getProject, getAllProjectsWithSlug } from "@/lib/api";
import type { Project as ProjectType } from "@/lib/types";

export default function Project({
  project,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout page={project} preview={preview}>
      <Seo title={project.title} description={project.description} />
      {project?.blocksCollection?.items.map((block) => (
        <Fragment key={block?.sys.id}>
          {block?.__typename === "Text" ? (
            <Text block={block} />
          ) : (
            block?.__typename === "Media" && <Media block={block} />
          )}
        </Fragment>
      ))}
      <Back />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<
  {
    project: ProjectType;
    preview: boolean;
  },
  { slug: string }
> = async ({ params, locale, preview = false }) => {
  const { slug } = params!;
  const project = await getProject(slug, locale!, preview);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      preview,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const allProjects = await getAllProjectsWithSlug();
  const paths: { params: { slug: string }; locale: string }[] = [];

  allProjects.forEach((project) => {
    locales!.forEach((locale) => {
      if (!project?.slug) return;

      paths.push({
        params: { slug: project.slug },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};
