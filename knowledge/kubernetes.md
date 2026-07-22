# Kubernetes Knowledge Document

## Purpose

Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. It provides self-healing, load balancing, service discovery, and rolling updates. Understanding Kubernetes is essential for operating production workloads at scale, managing microservices architectures, and working with cloud-native applications.

## Core Concepts

### Pods

A Pod is the smallest deployable unit — one or more co-located containers that share network and storage. Most Pods run a single container. Pods are ephemeral; they are created, scheduled, and destroyed by the controller.

### Deployments

A Deployment manages ReplicaSets and provides declarative updates. It handles rolling updates, rollbacks, and scaling. The desired state is declared in a manifest; the controller continuously reconciles actual state with desired state.

### Services

A Service provides stable network identity for a set of Pods. Types:
- **ClusterIP** (default) — Internal access within the cluster
- **NodePort** — Exposes on a static port on each node
- **LoadBalancer** — Provisions cloud load balancer
- **ExternalName** — Maps to a DNS name outside the cluster

### Ingress

Ingress manages external HTTP/HTTPS routing to Services. It provides host-based and path-based routing, TLS termination, and name-based virtual hosting. Ingress controllers (NGINX, Traefik, Cloudflare) implement the Ingress resource.

### ConfigMaps and Secrets

ConfigMaps store non-sensitive configuration as key-value pairs. Secrets store sensitive data (base64-encoded, not encrypted by default). Both can be mounted as files or injected as environment variables.

### Horizontal Pod Autoscaler (HPA)

HPA automatically scales the number of Pod replicas based on CPU utilization, memory usage, or custom metrics. It requires metrics-server and resource requests defined on containers.

## Best Practices

1. **Always set resource requests and limits** — Without `resources.requests`, Kubernetes cannot schedule Pods correctly. Without `resources.limits`, Pods can consume unbounded resources and starve neighbors.

2. **Use namespaces for environment separation** — Create separate namespaces for `dev`, `staging`, and `production`. This provides isolation, quota management, and RBAC boundaries.

3. **Implement liveness and readiness probes** — Liveness probes detect and restart stuck containers. Readiness probes control traffic routing. Without them, Kubernetes cannot make intelligent scheduling decisions.

4. **Use Deployment with rolling update strategy** — Configure `maxSurge` and `maxUnavailable` to control update speed. Use `maxUnavailable: 0` with `maxSurge: 1` for zero-downtime deployments.

5. **Store configuration in ConfigMaps, not environment variables in manifests** — ConfigMaps are versionable, shareable, and allow configuration changes without rebuilding images.

6. **Use Helm charts for templating** — Helm manages complex Kubernetes manifests with templating, versioning, and rollback. Store charts in version control and use `values.yaml` for environment-specific overrides.

7. **Implement network policies** — By default, all Pods can communicate with all other Pods. Use NetworkPolicy resources to restrict traffic between namespaces and services.

8. **Monitor with Prometheus and Grafana** — Deploy kube-prometheus-stack for cluster monitoring. Alert on Pod restarts, resource pressure, and deployment failures.

## Anti-Patterns

1. **Running as root in containers** — Use `securityContext.runAsNonRoot: true` and `runAsUser: 1000`. Running as root escalates container escape risks.

2. **Using `latest` image tags in deployments** — Always pin to specific versions or SHA digests. `latest` tags cause unpredictable deployments and broken rollbacks.

3. **Storing persistent data in containers** — Containers are ephemeral. Use PersistentVolumes (PV) and PersistentVolumeClaims (PVC) for any data that must survive restarts.

4. **Exposing services directly via NodePort in production** — Use Ingress controllers for HTTP routing. NodePort is for development and internal tools only.

5. **Not using `kubectl diff` before apply** — Always review changes before applying. `kubectl diff -f manifest.yaml` shows what will change.

6. **Ignoring Pod disruption budgets** — Without PodDisruptionBudget (PDB), voluntary disruptions (node drains, cluster upgrades) can take down your service. Define PDBs for all production workloads.

7. **Hardcoding secrets in manifests** — Never commit secrets to version control. Use external secret managers (Vault, AWS Secrets Manager) or sealed-secrets.

## Common Mistakes

1. **Forgetting `selector` in Deployment** — The `spec.selector` field must match `spec.template.metadata.labels`. Mismatches cause the Deployment to create infinite ReplicaSets.

2. **Using `replicas` with HPA** — When HPA is configured, remove `replicas` from the Deployment. HPA manages replica count; manual `replicas` interfere with autoscaling.

3. **Not setting `terminationGracePeriodSeconds`** — Default is 30 seconds. Applications need time to drain connections and flush data. Set it based on your shutdown duration.

4. **Assuming Pod IPs are stable** — Pod IPs change on restart. Always use Service DNS names for inter-service communication.

5. **Skipping namespace in kubectl commands** — `kubectl get pods` shows only the current context's default namespace. Use `-n namespace` explicitly.

6. **Not using `imagePullPolicy: IfNotPresent` for tagged images** — For version-pinned images, `IfNotPresent` avoids unnecessary pulls. Only use `Always` for `latest` tags.

7. **Ignoring resource fragmentation** — Large resource requests cause scheduling failures even when nodes have capacity. Use Vertical Pod Autoscaler (VPA) right-sizing recommendations.

## Decision Guidelines

- **Use Kubernetes when:** You have multiple services, need auto-scaling, require self-healing, or operate across multiple cloud providers.
- **Use Docker Compose when:** You're running a single-node development environment or a simple single-server deployment.
- **Use HPA when:** Your workload has predictable traffic patterns (time-of-day, batch processing). Combine with Cluster Autoscaler for node-level scaling.
- **Use Helm when:** Your Kubernetes manifests exceed 3 files or you deploy to multiple environments with shared configuration.

## References

- Kubernetes Docs: https://kubernetes.io/docs
- Kubernetes The Hard Way: https://github.com/kelseyhightower/kubernetes-the-hard-way
- Helm Docs: https://helm.sh/docs
- k9s (terminal UI): https://k9scli.io
- Lens (desktop UI): https://k8slens.dev

## Practical Notes

- `kubectl get events --sort-by=.lastTimestamp` shows recent cluster events for debugging.
- `kubectl logs pod-name -c container-name --previous` shows logs from crashed containers.
- `kubectl port-forward svc/service-name 8080:80` tunnels a remote service to localhost.
- `kubectl rollout status deployment/name` tracks deployment progress.
- `kubectl rollout undo deployment/name` rolls back to the previous revision.
- Use `kustomize` for simpler templating needs without Helm's overhead.
- For local Kubernetes, use `minikube`, `kind`, or Docker Desktop's built-in cluster.
