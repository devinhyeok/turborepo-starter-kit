import { notFound } from 'next/navigation'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '@/mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  // .well-known 경로는 제외
  if (params.mdxPath && params.mdxPath[0] === '.well-known') {
    return {}
  }
  const { metadata } = await importPage(params.mdxPath, params.lang)
  return metadata
}

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[]
    lang: string
  }>
}>
const Wrapper = useMDXComponents().wrapper

export default async function Page(props: PageProps) {
  const params = await props.params
  // .well-known 경로는 404 처리
  if (params.mdxPath && params.mdxPath[0] === '.well-known') {
    notFound()
  }
  const result = await importPage(params.mdxPath, params.lang)
  const { default: MDXContent, toc, metadata, sourceCode } = result

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
