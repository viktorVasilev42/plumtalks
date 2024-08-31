all: apply

apply: namespace configmap secret deployment service

namespace:
	kubectl apply -f namespace.yaml

configmap: namespace
	kubectl apply -f configmap.yaml

secret: namespace
	kubectl apply -f secret.yaml

deployment: configmap secret
	kubectl apply -f mysql-statefulset.yaml
	kubectl apply -f plumtalks-backend-deployment.yaml
	kubectl apply -f plumtalks-frontend-deployment.yaml

service: deployment
	kubectl apply -f mysql-service.yaml
	kubectl apply -f backend-service.yaml
	kubectl apply -f frontend-service.yaml

ingress: service
	kubectl apply -f ingress.yaml
