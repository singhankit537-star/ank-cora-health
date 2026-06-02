import { newsArticles } from '../../data/news'
import Card from '../ui/Card'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import TriangleAccent from '../ui/TriangleAccent'

export default function NewsSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          title="What's New At CORA"
          className="mb-12"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <NewsCard key={article.id} {...article} />
          ))}
        </div>
      </Container>
      <TriangleAccent className="mt-16" />
    </section>
  )
}

function NewsCard({ title, excerpt, image }) {
  return (
    <Card hover as="article" className="flex flex-col">
      <a href="#" className="block overflow-hidden">
        <img
          src={image}
          alt=""
          className="aspect-[3/2] w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </a>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-cora-navy leading-snug hover:text-cora-blue">
          <a href="#">{title}</a>
        </h3>
        <p className="mt-3 flex-1 text-sm text-cora-gray leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        <a
          href="#"
          className="mt-4 inline-flex items-center text-sm font-semibold text-cora-blue hover:text-cora-teal"
        >
          Read more
          <span aria-hidden="true" className="ml-1">→</span>
        </a>
      </div>
    </Card>
  )
}
