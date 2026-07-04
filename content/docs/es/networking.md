---
title: Redes
description: Bridge, CNI, DNS, iptables, mapeo de puertos, rootless
category: Referencia
---

# Redes

La pila de redes de Doki proporciona redes bridge, soporte de plugins CNI, mapeo de puertos y un servidor DNS interno.

## Tipos de Red

| Tipo | Descripción | Driver |
|:-----|:------------|:-------|
| **bridge** | Bridge `doki0` predeterminado con NAT, DNS, mapeo de puertos | Linux bridge + iptables |
| **host** | Compartir namespace de red del host | (sin driver) |
| **none** | Solo loopback | (sin driver) |
| **overlay** | Multi-host (planeado) | vxlan |
| **macvlan** | Acceso directo a NIC del host | macvlan |
| **ipvlan** | Aislamiento L3 | ipvlan |

### Bridge Predeterminado: `doki0`

En el primer inicio, el demonio crea un bridge Linux llamado `doki0`:

| Propiedad | Predeterminado |
|:----------|:---------------|
| Subred | `10.0.0.0/24` |
| Gateway | `10.0.0.1` |
| MTU | 1500 |
| Asignación IP | Secuencial (`.2`, `.3`, ...) |
| iptables | MASQUERADE en salida, DNAT en reenvío de puertos |

### Conexión de Contenedor

Cuando se inicia un contenedor con `--network bridge`, el demonio:

1. Crea un par veth (`veth<random>` ↔ `eth0` dentro del contenedor)
2. Conecta el veth del lado host a `doki0`
3. Asigna una IP de la subred
4. Configura reglas iptables
5. Registra el nombre del contenedor en el DNS interno

## Mapeo de Puertos

### Sintaxis

```bash
-p IP_HOST:PUERTO_HOST:PUERTO_CONTENEDOR/PROTOCOLO
-p PUERTO_HOST:PUERTO_CONTENEDOR
-p PUERTO_CONTENEDOR   # puerto host aleatorio
```

### Cómo funciona (rootful)

1. `iptables -t nat -A DOKI -p tcp --dport 8080 -j DNAT --to-destination 10.0.0.2:80`
2. `iptables -t nat -A POSTROUTING -s 10.0.0.2 -j MASQUERADE`
3. `socat` para proxy TCP real en modo rootless

## DNS Interno

Doki ejecuta un servidor DNS interno que maneja:

- Resolución de nombres entre contenedores
- Registros A (IPv4), AAAA (IPv6), PTR (DNS inverso)
- Reenvío a resolutores upstream

### Predeterminados

| Plataforma | Escucha predeterminada | Por qué |
|:-----------|:-----------------------|:--------|
| Linux | `127.0.0.11:53` | Puerto estándar no privilegiado |
| Android (Termux) | `127.0.0.11:8053` | Puerto 53 bloqueado por SELinux |

### Caché LRU

El servidor DNS tiene un caché LRU incorporado:
- 1024 entradas
- TTL de 5 minutos por entrada
- Re-registrado al reiniciar el contenedor

## Red Rootless (pasta)

Para usuarios sin root, Doki usa [pasta](https://passt.top/). Pasta proporciona:
- Conectividad TCP/UDP sin root ni dispositivos TAP
- Modo ICS (Internet Connection Sharing)
- Servidor DHCP incorporado

Uso:

```bash
doki run --rm --network bridge alpine ping -c 1 8.8.8.8
```

## IPv6

Habilita en el bridge predeterminado:

```json
{
  "network": {
    "ipv6": true
  }
}
```

## Consideraciones de Seguridad

| Preocupación | Mitigación |
|:-------------|:-----------|
| Contenedor esnifando tráfico del host | Usar `--network bridge` (predeterminado), no `host` |
| Escape de contenedor manipulando iptables | Cadena DOKI tiene espacio de nombres separado |
| Suplantación DNS | Respuestas DNS vinculadas a la IP del contenedor |
| Suplantación ARP | Doki habilita `arp_ignore`/`arp_announce` en interfaces veth |

## Fuente

- `pkg/network/manager.go` — bridge, reenvío de puertos, veth, teardown
- `pkg/network/cni.go` — gestor de plugins CNI, cadena DOKI
- `pkg/network/dns.go` — servidor DNS interno
- `pkg/network/rootless.go` — integración pasta
- `pkg/common/resolv.go` — análisis de resolv.conf
