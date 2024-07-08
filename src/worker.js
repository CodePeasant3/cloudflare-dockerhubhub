// REF: https://developers.cloudflare.com/workers/examples/bulk-origin-proxy/

export default {
	async fetch(request) {

	  const ORIGINS = {
		"d": "registry.hub.docker.com",
		"ddd": "registry.hub.docker.com",
		"dockerhub": "registry.hub.docker.com",
		"k": "registry.k8s.io",
		"kkk": "registry.k8s.io",
		"k8s": "registry.k8s.io",
		"q": "quay.io",
		"qqq": "quay.io",
		"quay": "quay.io",
		"g": "gcr.io",
		"ggg": "gcr.io",
		"gcr": "gcr.io",
	  };

	  const url = new URL(request.url);
	  const url_key = url.hostname.split('.')[0]

	  if (url_key in ORIGINS) {
		url.host = ORIGINS[url_key];
		return fetch(url, { headers: request.headers, method: request.method, body: request.body });
	  }

	  return fetch(request);

	},
  };
