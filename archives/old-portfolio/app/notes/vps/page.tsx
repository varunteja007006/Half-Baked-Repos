import { MDXRemote } from 'remote-mdx/rsc'

export default async function VPS() {
    // MDX text - can be from a local file, database, CMS, fetch, anywhere...
    const res = await fetch('https://raw.githubusercontent.com/varunteja007006/Practice/refs/heads/main/VPS/README.md')
    const markdown = await res.text()
    return <MDXRemote source={markdown} />
  }

