//pages/sitemap.xml.js

function generateSiteMap(posts: { page_id: string, title: string }[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST}</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST}/list</loc>
     </url>
     ${(posts || [])
        .map(({page_id, title}) => {
            return encodeURI(`${process.env.NEXT_PUBLIC_HOST}/pages/${page_id}/${title}`);
        }).map((s:string)=>{
            return `
     <url>
       <loc>${s}</loc>
        <changefreq>weekly</changefreq>
     </url>`;
        })
        .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({res}: any) {
    // We make an API call to gather the URLs for our site
    const request = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pages/get_all_id_and_title`);
    const posts = await request.json();

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts.data);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;