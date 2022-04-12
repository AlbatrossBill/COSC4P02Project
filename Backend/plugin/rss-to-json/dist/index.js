(() => {
  "use strict";
  var e = {
      306: (e, t, r) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        const a = r(861),
          i = r(376);
        t.default = async (e, t) => {
          var r, n;
          if (!/(^http(s?):\/\/[^\s$.?#].[^\s]*)/i.test(e)) return null;
          try {
            const { data: s } = await i.default(e, t),
              u = a.parse(s, {
                attributeNamePrefix: "",
                textNodeName: "$text",
                ignoreAttributes: !1,
              });
            let o = u.rss && u.rss.channel ? u.rss.channel : u.feed;
            Array.isArray(o) && (o = o[0]);
            const d = {
              title: null !== (r = o.title) && void 0 !== r ? r : "",
              description:
                null !== (n = o.description) && void 0 !== n ? n : "",
              link: o.link && o.link.href ? o.link.href : o.link,
              image: o.image
                ? o.image.url
                : o["itunes:image"]
                ? o["itunes:image"].href
                : "",
              category: o.category || [],
              items: [],
            };
            let l = o.item || o.entry;
            l && !Array.isArray(l) && (l = [l]);
            for (let e = 0; e < l.length; e++) {
              const t = l[e];
              let r = {},
                a = {
                  id: t.guid && t.guid.$t ? t.guid.$t : t.id,
                  title: t.title && t.title.$text ? t.title.$text : t.title,
                  description:
                    t.summary && t.summary.$text
                      ? t.summary.$text
                      : t.description,
                  link: t.link && t.link.href ? t.link.href : t.link,
                  author:
                    t.author && t.author.name ? t.author.name : t["dc:creator"],
                  published: t.created
                    ? Date.parse(t.created)
                    : t.pubDate
                    ? Date.parse(t.pubDate)
                    : Date.now(),
                  created: t.updated
                    ? Date.parse(t.updated)
                    : t.pubDate
                    ? Date.parse(t.pubDate)
                    : t.created
                    ? Date.parse(t.created)
                    : Date.now(),
                  category: t.category || [],
                  content:
                    t.content && t.content.$text
                      ? t.content.$text
                      : t["content:encoded"],
                  enclosures: t.enclosure
                    ? Array.isArray(t.enclosure)
                      ? t.enclosure
                      : [t.enclosure]
                    : [],
                };
              [
                "content:encoded",
                "podcast:transcript",
                "itunes:summary",
                "itunes:author",
                "itunes:explicit",
                "itunes:duration",
                "itunes:season",
                "itunes:episode",
                "itunes:episodeType",
                "itunes:image",
              ].forEach((e) => {
                t[e] && (a[e.replace(":", "_")] = t[e]);
              }),
                t["media:thumbnail"] &&
                  (Object.assign(r, { thumbnail: t["media:thumbnail"] }),
                  a.enclosures.push(t["media:thumbnail"])),
                t["media:content"] &&
                  (Object.assign(r, { thumbnail: t["media:content"] }),
                  a.enclosures.push(t["media:content"])),
                t["media:group"] &&
                  (t["media:group"]["media:title"] &&
                    (a.title = t["media:group"]["media:title"]),
                  t["media:group"]["media:description"] &&
                    (a.description = t["media:group"]["media:description"]),
                  t["media:group"]["media:thumbnail"] &&
                    a.enclosures.push(t["media:group"]["media:thumbnail"].url)),
                Object.assign(a, { media: r }),
                d.items.push(a);
            }
            return d;
          } catch (e) {
            return { title: "failed", reason: e };
          }
        };
      },
      376: (e) => {
        e.exports = require("axios");
      },
      861: (e) => {
        e.exports = require("fast-xml-parser");
      },
    },
    t = {};
  function r(a) {
    var i = t[a];
    if (void 0 !== i) return i.exports;
    var n = (t[a] = { exports: {} });
    return e[a](n, n.exports, r), n.exports;
  }
  var a = {};
  (() => {
    var e = a;
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.Parse = e.parse = void 0);
    const t = r(306);
    e.parse = t.default;
    const i = t.default;
    (e.Parse = i), (e.default = t.default);
  })();
  var i = exports;
  for (var n in a) i[n] = a[n];
  a.__esModule && Object.defineProperty(i, "__esModule", { value: !0 });
})();
