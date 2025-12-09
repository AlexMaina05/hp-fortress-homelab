# HP Fortress: Enterprise-Grade Homelab Infrastructure

## 🚀 Project Overview
Progettazione e implementazione di un'infrastruttura server on-premise ibrida, basata su hardware enterprise ricondizionato. Il progetto simula un ambiente di data center reale per scopi di R&D, hosting di servizi self-hosted e gestione dati centralizzata.

L'infrastruttura è progettata per operare 24/7 con un focus su **Alta Disponibilità**, **Sicurezza dei Dati** (3-2-1 Backup Strategy) e **Segregazione dei Privilegi** (IAM).

🔗 **[Scarica la Documentazione Tecnica Completa (PDF)](./docs/HP_Fortress_TDD.pdf)**

## 🛠 Tech Stack

* **Hardware:** HP EliteDesk 800 G4 Tower (i5-8500, 32GB DDR4), WD Red Plus (RAID 1).
* **Virtualization:** Windows Server 2025 Datacenter (Hyper-V), Docker.
* **Storage:** Microsoft Storage Spaces (Software-Defined), ReFS File System.
* **OS & Services:** Windows Server 2025, Ubuntu Server 24.04 LTS, SQL Server Standard.
* **Networking & Security:** Tailscale (Mesh VPN), Cloudflare Tunnel (Zero Trust), Access-Based Enumeration (ABE).
* **Applications:** Plex, Immich, Navidrome, IIS.

## 🏗 Architecture Highlights

### 1. Hybrid Virtualization Strategy
Utilizzo di un approccio ibrido che combina la robustezza di **Hyper-V** per i carichi infrastrutturali (Domain Controller, SQL Server) con l'agilità di **Docker** (su VM Linux guest) per i microservizi multimediali.
* **Host:** Windows Server 2025 Datacenter (Core Infrastructure).
* **Guest VMs:** Segregazione dei ruoli (Identity, Application, Database).

### 2. Data Governance & Security
Implementazione di un modello di sicurezza "Zero Trust" per la rete e "Least Privilege" per i dati.
* **IAM:** Gestione granulare delle ACL NTFS per segregare i dati tra diversi utenti (Famiglia vs Admin).
* **ABE:** Access-Based Enumeration attiva per nascondere le cartelle non autorizzate agli utenti finali.
* **Storage Resilience:** RAID 1 (Mirror) su ReFS per protezione contro bit-rot e guasti fisici.

### 3. Backup & Disaster Recovery
Strategia di backup 3-2-1 implementata tramite **Veeam Backup & Replication**.
* Snapshot orari VSS per recupero immediato.
* Backup notturni off-site crittografati.

## 💻 Engineering Challenges Solved

* **Budget Constraint:** Realizzazione di un nodo server enterprise-grade con un budget hardware < €600, ottimizzando l'uso di licenze Azure Education.
* **Driver Compatibility:** Integrazione di hardware client (Intel I219-LM) su OS Server tramite forzatura driver e configurazione custom del vSwitch Hyper-V.
* **Remote Access:** Esposizione sicura del portfolio web tramite Cloudflare Tunnel senza necessità di Port Forwarding o IP Pubblico statico.
