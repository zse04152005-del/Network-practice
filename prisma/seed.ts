import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Clear existing data
    await prisma.question.deleteMany()
    await prisma.topic.deleteMany()
    await prisma.chapter.deleteMany()

    const chapters = [
        // 计网 I
        { title: '计算机网络和因特网', category: '计网 I', link: 'https://hoyue.fun/network1_1.html' },
        { title: '第一、二层：物理层与数据链路层技术', category: '计网 I', link: 'https://hoyue.fun/network1_2.html' },
        { title: '第二层：以太网技术', category: '计网 I', link: 'https://hoyue.fun/network1_3.html' },
        { title: '第三层：网络层技术', category: '计网 I', link: 'https://hoyue.fun/network1_4.html' },
        { title: '计网 I 期中复习专题', category: '计网 I', link: 'https://hoyue.fun/network1_mid.html' },
        { title: '第三层：路由协议', category: '计网 I', link: 'https://hoyue.fun/network1_5.html' },
        { title: '第四层：传输层功能与协议', category: '计网 I', link: 'https://hoyue.fun/network1_6.html' },
        { title: '第五~七层：应用层功能与常见协议', category: '计网 I', link: 'https://hoyue.fun/network1_7.html' },
        { title: '计网 I 期末复习专题', category: '计网 I', link: 'https://hoyue.fun/network1_final.html' },

        // 计网 II
        { title: '交换式局域网(LAN)', category: '计网 II', link: 'https://hoyue.fun/network2_1.html' },
        { title: '虚拟局域网(VLAN)', category: '计网 II', link: 'https://hoyue.fun/network2_2.html' },
        { title: '无线局域网(WLAN)', category: '计网 II', link: 'https://hoyue.fun/network2_3.html' },
        { title: '地址分配和转换(DHCP + NAT)', category: '计网 II', link: 'https://hoyue.fun/network2_4.html' },
        { title: '广域网技术 I —— 广域网基础和专用网络', category: '计网 II', link: 'https://hoyue.fun/network2_5.html' },
        { title: '广域网技术 II —— 电路交换网络和分组交换网络', category: '计网 II', link: 'https://hoyue.fun/network2_6.html' },
        { title: '计网 II 期中复习专题', category: '计网 II', link: 'https://hoyue.fun/network2_mid.html' },
        { title: '隧道技术(Tunneling + VPN)', category: '计网 II', link: 'https://hoyue.fun/network2_7.html' },
        { title: '访问控制(AAA + Firewall)', category: '计网 II', link: 'https://hoyue.fun/network2_8.html' },
        { title: '流量控制(流量整形与流量排队)', category: '计网 II', link: 'https://hoyue.fun/network2_9.html' },
        { title: '计网 II 期末复习专题', category: '计网 II', link: 'https://hoyue.fun/network2_final.html' },

        // 专题
        { title: '网络收发过程', category: '专题', link: 'https://hoyue.fun/network.html#网络收发过程' },
        { title: 'Layer 2 数据链路层', category: '专题', link: 'https://hoyue.fun/network.html#Layer-2-数据链路层' },
        { title: 'Cisco 网络 OS 和 VLAN 原理', category: '专题', link: 'https://hoyue.fun/network.html#Cisco-网络-OS-和-VLAN-原理' },
        { title: '生成树协议', category: '专题', link: 'https://hoyue.fun/network.html#生成树协议' },
        { title: 'Layer 3 网络层', category: '专题', link: 'https://hoyue.fun/network.html#Layer-3-网络层' },
        { title: 'IP 基础知识', category: '专题', link: 'https://hoyue.fun/network.html#IP-基础知识' },
        { title: 'IP 路由基础', category: '专题', link: 'https://hoyue.fun/network.html#IP-路由基础' },
        { title: '网络基础服务与安全', category: '专题', link: 'https://hoyue.fun/network.html#网络基础服务与安全' },
        { title: '网络地址转换——NAT', category: '专题', link: 'https://hoyue.fun/network.html#网络地址转换-NAT' },
    ]

    const chapter1Questions = [
        // MCQs
        {
            content: "According to the classification of signals, a data network uses ______ transmission, while a voice network typically uses ______ transmission.",
            type: "MCQ",
            options: JSON.stringify(["Analog; Digital", "Digital; Analog", "Continuous; Discrete", "Wireless; Wired"]),
            correctAnswer: "Digital; Analog",
            explanation: "The slides state that a data network uses digital transmission (discrete signal), while a voice network uses analog transmission (continuous signal).",
            difficulty: "EASY"
        },
        {
            content: "Which of the following best describes an 'Intranet'?",
            type: "MCQ",
            options: JSON.stringify(["A global network connecting all users publicly.", "A private network accessible only by an organization's members.", "A network extending access to external users securely.", "A network connecting different cities."]),
            correctAnswer: "A private network accessible only by an organization's members.",
            explanation: "Intranets are defined as private networks belonging to an organization, accessible only by its members.",
            difficulty: "EASY"
        },
        {
            content: "In the OSI reference model, which layer is responsible for 'Best path determination between hosts'?",
            type: "MCQ",
            options: JSON.stringify(["Transport Layer", "Data Link Layer", "Network Layer", "Session Layer"]),
            correctAnswer: "Network Layer",
            explanation: "The Network layer (Layer 3) determines the best path for data to travel between hosts.",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the correct order of Protocol Data Units (PDUs) from Layer 4 down to Layer 1?",
            type: "MCQ",
            options: JSON.stringify(["Packets, Segments, Frames, Bits", "Segments, Packets, Frames, Bits", "Frames, Packets, Segments, Bits", "Segments, Frames, Packets, Bits"]),
            correctAnswer: "Segments, Packets, Frames, Bits",
            explanation: "Layer 4 uses Segments, Layer 3 uses Packets, Layer 2 uses Frames, and Layer 1 uses Bits.",
            difficulty: "MEDIUM"
        },
        {
            content: "Which layer in the TCP/IP model corresponds to the combination of the Physical and Data Link layers in the OSI model?",
            type: "MCQ",
            options: JSON.stringify(["Internet Layer", "Transport Layer", "Network Access Layer", "Application Layer"]),
            correctAnswer: "Network Access Layer",
            explanation: "The Network Access Layer (also called host-to-network layer) includes details of the OSI physical and data link layers.",
            difficulty: "MEDIUM"
        },
        {
            content: "In data encapsulation, what information is typically added by Layer 2 (Data Link Layer)?",
            type: "MCQ",
            options: JSON.stringify(["Logical addresses (IP addresses)", "Port numbers", "Local addresses (MAC addresses) and a trailer", "User data only"]),
            correctAnswer: "Local addresses (MAC addresses) and a trailer",
            explanation: "Layer 2 adds frames which include the local address (e.g., MAC Address) to the data link header and typically a trailer.",
            difficulty: "MEDIUM"
        },
        {
            content: "Which physical topology connects all devices to a central concentration point, such as a hub or switch?",
            type: "MCQ",
            options: JSON.stringify(["Bus Topology", "Ring Topology", "Star Topology", "Mesh Topology"]),
            correctAnswer: "Star Topology",
            explanation: "The Star topology features devices connected to a central point. Ethernet is often wired as a star.",
            difficulty: "EASY"
        },
        {
            content: "Ethernet is physically wired as a Star (or Extended Star) topology, but logically it operates as a ______ topology.",
            type: "MCQ",
            options: JSON.stringify(["Ring", "Bus", "Mesh", "Point-to-Point"]),
            correctAnswer: "Bus",
            explanation: "The slides state Ethernet has a physical star topology but a logical bus topology where information flows linearly.",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the difference between Bandwidth and Throughput?",
            type: "MCQ",
            options: JSON.stringify(["Bandwidth is the actual measured speed; Throughput is the theoretical maximum.", "Bandwidth is the theoretical maximum; Throughput is the actual measured speed.", "They are exactly the same.", "Throughput is always higher than Bandwidth."]),
            correctAnswer: "Bandwidth is the theoretical maximum; Throughput is the actual measured speed.",
            explanation: "Bandwidth is the maximum theoretical amount of information, while Throughput is the actual measured bandwidth affected by various factors. Therefore, Throughput <= Bandwidth.",
            difficulty: "MEDIUM"
        },
        {
            content: "If a signal uses 8 different voltage levels (L=8) and the baud rate is 1000 baud, what is the bit rate?",
            type: "MCQ",
            options: JSON.stringify(["1000 bps", "2000 bps", "3000 bps", "8000 bps"]),
            correctAnswer: "3000 bps",
            explanation: "Formula: Bit Rate = Baud * log2(L). Here, log2(8) = 3. So, 1000 * 3 = 3000 bps.",
            difficulty: "HARD"
        },
        {
            content: "Which delay component is defined as 'the time needed to push all the packet bits on the transmission link'?",
            type: "MCQ",
            options: JSON.stringify(["Propagation Delay", "Transmission Delay", "Processing Delay", "Queuing Delay"]),
            correctAnswer: "Transmission Delay",
            explanation: "Transmission delay depends on the message size and the link speed (bandwidth).",
            difficulty: "MEDIUM"
        },
        {
            content: "Calculate the Transmission Delay for a 5000-bit message on a 1 Gbps link.",
            type: "MCQ",
            options: JSON.stringify(["5 μs", "10 μs", "50 μs", "5 ms"]),
            correctAnswer: "5 μs",
            explanation: "TD = Size / Speed = 5000 / (1 * 10^9) = 5 * 10^-6 seconds, which is 5 μs.",
            difficulty: "HARD"
        },
        {
            content: "Which protocol is located at the Transport Layer of the TCP/IP model?",
            type: "MCQ",
            options: JSON.stringify(["IP", "HTTP", "TCP", "Ethernet"]),
            correctAnswer: "TCP",
            explanation: "TCP and UDP are protocols specified at the Transport Layer.",
            difficulty: "EASY"
        },
        {
            content: "What is a PDU (Protocol Data Unit)?",
            type: "MCQ",
            options: JSON.stringify(["The physical cable used for connection.", "The information exchanged by protocols of each layer, consisting of Header, Payload, and Trailer.", "The speed of the network connection.", "A device that routes packets."]),
            correctAnswer: "The information exchanged by protocols of each layer, consisting of Header, Payload, and Trailer.",
            explanation: "PDUs are the units of data exchanged between peer layers, containing control info (headers/trailers) and user data (payload).",
            difficulty: "MEDIUM"
        },
        {
            content: "In the context of network performance, what does 'Latency' typically refer to?",
            type: "MCQ",
            options: JSON.stringify(["The width of the frequency band.", "The number of bits per second.", "The time a datagram takes to travel from source to destination.", "The maximum voltage level of a signal."]),
            correctAnswer: "The time a datagram takes to travel from source to destination.",
            explanation: "Latency is defined as the time taken for data to travel from the source station to the destination.",
            difficulty: "MEDIUM"
        },

        // Fill-in-the-Blank
        {
            content: "A ______ is a set of rules that specify how devices interact, including message format, timing, and sequencing.",
            type: "FIB",
            options: null,
            correctAnswer: "Protocol",
            explanation: "A protocol defines the format and order of messages exchanged between two or more communicating entities.",
            difficulty: "EASY"
        },
        {
            content: "In the OSI model, Layer k is called the service ______, and Layer k+1 is called the service ______.",
            type: "FIB",
            options: null,
            correctAnswer: "provider; user",
            explanation: "The lower layer provides services to the upper layer.",
            difficulty: "MEDIUM"
        },
        {
            content: "The location where Layer k+1 can access the services offered by Layer k is called a ______.",
            type: "FIB",
            options: null,
            correctAnswer: "Service Access Point (SAP)",
            explanation: "SAP is the interface between layers.",
            difficulty: "MEDIUM"
        },
        {
            content: "______ is the process where data is wrapped with headers and trailers as it moves down the layers of the OSI model.",
            type: "FIB",
            options: null,
            correctAnswer: "Encapsulation",
            explanation: "Encapsulation adds protocol information at each layer.",
            difficulty: "EASY"
        },
        {
            content: "The TCP/IP model has fewer layers than the OSI model. It combines the OSI Presentation and ______ layers into its Application layer.",
            type: "FIB",
            options: null,
            correctAnswer: "Session",
            explanation: "TCP/IP Application layer covers OSI Application, Presentation, and Session layers.",
            difficulty: "MEDIUM"
        },
        {
            content: "WANs (Wide Area Networks) usually connect users across a large geographic area and use technologies like DSL, ISDN, and ______.",
            type: "FIB",
            options: null,
            correctAnswer: "Frame Relay",
            explanation: "Frame Relay is a WAN technology mentioned in the slides.",
            difficulty: "MEDIUM"
        },
        {
            content: "In digital systems, the basic unit of bandwidth is ______.",
            type: "FIB",
            options: null,
            correctAnswer: "bits per second (bps)",
            explanation: "Bandwidth is measured in bits per second.",
            difficulty: "EASY"
        },
        {
            content: "If a sender and receiver are separated by a single switch (2 links), the total Transfer Delay is calculated as: ______ × (Transmission Delay + Propagation Delay).",
            type: "FIB",
            options: null,
            correctAnswer: "2",
            explanation: "With one switch, there are two 'hops' or links. The message is transmitted and propagated twice.",
            difficulty: "HARD"
        },
        {
            content: "______ topology is characterized by a physical dual-ring and logical ring topology.",
            type: "FIB",
            options: null,
            correctAnswer: "FDDI",
            explanation: "FDDI uses a dual-ring topology for redundancy.",
            difficulty: "MEDIUM"
        },
        {
            content: "According to Shannon's theory equivalence in the slides, 1 Mbps is equal to ______ bps.",
            type: "FIB",
            options: null,
            correctAnswer: "1,000,000",
            explanation: "1 Mbps = 10^6 bps.",
            difficulty: "EASY"
        },

        // True/False
        {
            content: "In a peer-to-peer communication within the OSI model, Layer 3 on the source host communicates directly with Layer 3 on the destination host without passing through the lower layers.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "While it is *conceptually* peer-to-peer communication, physically the data must undergo encapsulation and pass down through the lower layers.",
            difficulty: "MEDIUM"
        },
        {
            content: "The Internet is considered a 'network of networks' and consists of interconnected networks belonging to ISPs.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "The slides define the Internet as a globally publicly-accessible mesh of interconnected networks belonging to ISPs.",
            difficulty: "EASY"
        },
        {
            content: "In the TCP/IP model, the 'Internet Layer' is responsible for reliable transmission, flow control, and error correction.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "Those are functions of the Transport Layer. The Internet layer deals with packet switching and path determination.",
            difficulty: "MEDIUM"
        },
        {
            content: "In a Token Ring network, the physical topology is a star, but the logical topology is a ring.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "Token Ring is wired as a star (physically) but information flows in a logical ring.",
            difficulty: "MEDIUM"
        },
        {
            content: "If a network has a high Bandwidth, it is guaranteed to always have high Throughput.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "Throughput is affected by the number of users, devices, and traffic type. Throughput is always less than or equal to bandwidth.",
            difficulty: "MEDIUM"
        }
    ]

    const chapter2Questions = [
        {
            content: "Which organization is responsible for the IEEE 802.3 standard?",
            type: "MCQ",
            options: JSON.stringify(["ISO", "IEEE", "ANSI", "ITU"]),
            correctAnswer: "IEEE",
            explanation: "IEEE (电气电子工程师学会) 制定了 802 系列标准，其中 802.3 是以太网标准。ISO 定义了 OSI 模型。",
            difficulty: "EASY"
        },
        {
            content: "In Baseband signaling, how is the data signal transmitted?",
            type: "MCQ",
            options: JSON.stringify(["It is modulated onto a carrier wave.", "It uses Frequency Division Multiplexing.", "The data signal is transmitted directly over the transmission medium using the entire bandwidth.", "It uses analog signals exclusively."]),
            correctAnswer: "The data signal is transmitted directly over the transmission medium using the entire bandwidth.",
            explanation: "基带 (Baseband) 信号直接在介质上传输，占用整个带宽，以太网通常使用这种方式。选项 A 和 B 描述的是宽带传输。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which encoding scheme is characterized by a transition in the middle of the bit period, where a low-to-high transition represents a 1?",
            type: "MCQ",
            options: JSON.stringify(["NRZ-L", "Manchester", "MLT-3", "4B/5B"]),
            correctAnswer: "Manchester",
            explanation: "曼彻斯特编码 (Manchester) 的特征是在位中间进行跳变。根据课件，低到高跳变表示 1，高到低跳变表示 0。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which sublayer of the Data Link Layer is technology-independent and provides services to the network layer?",
            type: "MCQ",
            options: JSON.stringify(["MAC", "LLC", "Physical", "Routing"]),
            correctAnswer: "LLC",
            explanation: "LLC (逻辑链路控制) 子层 (IEEE 802.2) 独立于具体硬件技术，负责与上层协议（如网络层）通信。MAC 子层则依赖于介质访问技术。",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the purpose of the 'Jam signal' in CSMA/CD?",
            type: "MCQ",
            options: JSON.stringify(["To indicate the successful transmission of a frame.", "To synchronize the sender and receiver.", "To enforce a collision so all hosts detect it.", "To request the token in a Token Ring network."]),
            correctAnswer: "To enforce a collision so all hosts detect it.",
            explanation: "当检测到冲突时，发送方会发送 32 位的 Jam 信号，以增强冲突信号，确保网段内所有主机都能检测到冲突并停止发送。",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the length of a standard MAC address?",
            type: "MCQ",
            options: JSON.stringify(["32 bits", "48 bits", "64 bits", "128 bits"]),
            correctAnswer: "48 bits",
            explanation: "标准以太网 MAC 地址长 48 位 (6 字节)，通常用 12 个十六进制数字表示。",
            difficulty: "EASY"
        },
        {
            content: "In the Ethernet naming convention '100BASE-TX', what does '100' represent?",
            type: "MCQ",
            options: JSON.stringify(["The maximum cable length in meters.", "The speed in Mbps.", "The frequency in MHz.", "The number of pairs in the cable."]),
            correctAnswer: "The speed in Mbps.",
            explanation: "100 代表传输速率为 100 Mbps (Megabits per second)。",
            difficulty: "EASY"
        },
        {
            content: "Which device extends a collision domain?",
            type: "MCQ",
            options: JSON.stringify(["Switch", "Router", "Bridge", "Hub"]),
            correctAnswer: "Hub",
            explanation: "Hub (集线器) 是物理层设备，它只是简单地转发信号，将所有连接的设备置于同一个冲突域中，从而扩展了冲突域。交换机、网桥和路由器都能分割冲突域。",
            difficulty: "EASY"
        },
        {
            content: "A 'Late Collision' is a collision that occurs after the first ______ octets of data have been transmitted.",
            type: "MCQ",
            options: JSON.stringify(["32", "48", "64", "96"]),
            correctAnswer: "64",
            explanation: "64 字节 (512 位) 是以太网的最小帧长和槽时间 (Slot Time)。如果在发送前 64 字节之后才发生冲突，则称为晚期冲突 (Late Collision)，通常表明网络电缆过长或配置错误。",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the broadcast MAC address?",
            type: "MCQ",
            options: JSON.stringify(["00-00-00-00-00-00", "FF-FF-FF-FF-FF-FF", "01-00-5E-xx-xx-xx", "11-11-11-11-11-11"]),
            correctAnswer: "FF-FF-FF-FF-FF-FF",
            explanation: "全 1 的 MAC 地址 (十六进制全 F) 是广播地址，用于向同一网段内的所有主机发送数据。",
            difficulty: "EASY"
        },
        {
            content: "Which Ethernet switching mode has the lowest latency but does not perform error checking?",
            type: "MCQ",
            options: JSON.stringify(["Store-and-forward", "Fragment-free", "Fast-forward (Cut-through)", "Adaptive switching"]),
            correctAnswer: "Fast-forward (Cut-through)",
            explanation: "快速转发 (Fast-forward) 或直通式 (Cut-through) 交换机只读取目的地址就开始转发，延迟最低，但不进行错误校验。",
            difficulty: "MEDIUM"
        },
        {
            content: "Fill in the blank: ______ is the time it takes for a signal to travel down the cable.",
            type: "MCQ",
            options: JSON.stringify(["Transmission delay", "Processing delay", "Propagation delay", "Queuing delay"]),
            correctAnswer: "Propagation delay",
            explanation: "传播延迟 (Propagation delay) 是信号在物理介质中从一端传输到另一端所需的时间，取决于电缆长度和信号速度。",
            difficulty: "MEDIUM"
        },
        {
            content: "The 'Slot time' for 10 Mbps and 100 Mbps Ethernet is defined as ______ bit-times.",
            type: "MCQ",
            options: JSON.stringify(["64", "96", "512", "4096"]),
            correctAnswer: "512",
            explanation: "槽时间定义为 512 bit-times (即 64 字节)，这是检测冲突所需的最小时间窗口。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which part of the Ethernet frame is used for synchronization?",
            type: "MCQ",
            options: JSON.stringify(["FCS", "Preamble", "SFD", "Length/Type"]),
            correctAnswer: "Preamble",
            explanation: "前导码 (Preamble) 是 7 字节的 10101010 模式，用于让接收方的时钟与发送方同步。",
            difficulty: "EASY"
        },
        {
            content: "What is the minimum interframe spacing required between two non-colliding frames?",
            type: "MCQ",
            options: JSON.stringify(["32 bit-times", "64 bit-times", "96 bit-times", "128 bit-times"]),
            correctAnswer: "96 bit-times",
            explanation: "以太网规定帧间隙 (Interframe Spacing) 为 96 bit-times，用于让接收方有时间处理上一帧并准备接收下一帧。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which field in the Ethernet frame is used to detect errors?",
            type: "MCQ",
            options: JSON.stringify(["Preamble", "Type/Length", "Data", "FCS"]),
            correctAnswer: "FCS",
            explanation: "帧校验序列 (FCS) 位于帧尾，包含 CRC 值，用于检测传输过程中的错误。",
            difficulty: "EASY"
        },
        {
            content: "The first 24 bits of a MAC address are known as the ______.",
            type: "MCQ",
            options: JSON.stringify(["NIC ID", "OUI", "Interface Serial Number", "CRC"]),
            correctAnswer: "OUI",
            explanation: "OUI (Organizational Unique Identifier，组织唯一标识符) 是由 IEEE 分配给厂商的前 24 位。",
            difficulty: "EASY"
        },
        {
            content: "In the backoff algorithm, if a collision occurs, the waiting period is chosen randomly from an interval that ______ with each attempt.",
            type: "MCQ",
            options: JSON.stringify(["decreases", "remains constant", "expands", "becomes zero"]),
            correctAnswer: "expands",
            explanation: "二进制指数退避算法 (Exponential Backoff) 会在每次冲突后扩大随机等待的时间窗口，以减少再次发生冲突的概率。",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the maximum size of an Ethernet frame (excluding Preamble/SFD)?",
            type: "MCQ",
            options: JSON.stringify(["64 bytes", "1500 bytes", "1518 bytes", "4096 bytes"]),
            correctAnswer: "1518 bytes",
            explanation: "以太网帧的最大长度为 1518 字节，包括 1500 字节的最大有效载荷 (MTU) 和 18 字节的头尾 (6+6+2+4)。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which Ethernet standard uses 'Pulse Amplitude Modulation 5' (PAM5)?",
            type: "MCQ",
            options: JSON.stringify(["10BASE-T", "100BASE-TX", "1000BASE-T", "1000BASE-SX"]),
            correctAnswer: "1000BASE-T",
            explanation: "1000BASE-T (千兆以太网) 使用 PAM5 编码在铜双绞线上实现高速传输。",
            difficulty: "MEDIUM"
        },
        {
            content: "A bridge builds its address table (bridging table) by examining the ______ of incoming frames.",
            type: "MCQ",
            options: JSON.stringify(["Destination IP address", "Source MAC address", "Destination MAC address", "FCS"]),
            correctAnswer: "Source MAC address",
            explanation: "网桥/交换机通过读取进入帧的**源 MAC 地址**来“学习”哪个设备连接在哪个端口上。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which of the following is a 'Deterministic' Media Access Control method?",
            type: "MCQ",
            options: JSON.stringify(["CSMA/CD", "Token Ring", "Ethernet", "Alohanet"]),
            correctAnswer: "Token Ring",
            explanation: "令牌环 (Token Ring) 通过传递令牌来控制访问，每个站点轮流发送，因此是确定性的。CSMA/CD 是非确定性的（基于竞争）。",
            difficulty: "MEDIUM"
        },
        {
            content: "If a switch receives a frame with a destination MAC address that is NOT in its switching table, what does it do?",
            type: "MCQ",
            options: JSON.stringify(["It discards the frame.", "It sends it back to the source.", "It floods the frame out all ports except the incoming port.", "It sends a Jam signal."]),
            correctAnswer: "It floods the frame out all ports except the incoming port.",
            explanation: "当目的地址未知时，交换机会泛洪 (Flood) 该帧，即向除接收端口外的所有端口转发，以确保目的主机能收到。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which field in the Ethernet frame indicates the upper-layer protocol (e.g., IPv4, ARP) if its value is greater than or equal to 1536 (0x0600)?",
            type: "MCQ",
            options: JSON.stringify(["Length", "Type", "FCS", "Preamble"]),
            correctAnswer: "Type",
            explanation: "在以太网 II 帧中，Length/Type 字段如果大于等于 1536，则解释为类型 (Type)，指示上层协议类别。小于 1536 则表示长度。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which switching mode reads the first 64 bytes of the frame before forwarding?",
            type: "MCQ",
            options: JSON.stringify(["Store-and-forward", "Fast-forward", "Fragment-free", "Cut-through"]),
            correctAnswer: "Fragment-free",
            explanation: "无分片 (Fragment-free) 模式读取前 64 字节，因为大多数冲突发生在帧的前 64 字节内，这种模式可以在保持较低延迟的同时过滤掉冲突产生的碎片帧 (Runt frames)。",
            difficulty: "MEDIUM"
        },
        {
            content: "Multicast MAC addresses always begin with which hexadecimal value?",
            type: "MCQ",
            options: JSON.stringify(["FF-FF-FF", "00-00-0C", "01-00-5E", "00-60-2F"]),
            correctAnswer: "01-00-5E",
            explanation: "IPv4 组播地址映射到 MAC 地址时，使用 01-00-5E 作为前缀。",
            difficulty: "MEDIUM"
        },
        {
            content: "What happens to the slot time in Gigabit Ethernet (1000 Mbps) to maintain collision detection over reasonable cable lengths?",
            type: "MCQ",
            options: JSON.stringify(["It is reduced to 64 bit-times.", "It remains 512 bit-times.", "It is increased to 4096 bit-times.", "Slot time is removed completely."]),
            correctAnswer: "It is increased to 4096 bit-times.",
            explanation: "为了在 1000 Mbps 下支持 100 米铜缆的冲突检测，槽时间增加到 4096 bit-times (512 字节)，这是通过载波扩展 (Carrier Extension) 实现的。",
            difficulty: "HARD"
        },
        {
            content: "True or False: In 100BASE-TX Ethernet, the 4B/5B encoding is used before MLT-3 encoding.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "正确。100BASE-TX 首先使用 4B/5B 将 4 位数据编码为 5 位代码（解决同步问题），然后使用 MLT-3 进行线路编码（降低频率需求）。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: Half-duplex communication allows sending and receiving data simultaneously.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "错误。全双工 (Full-duplex) 允许同时收发；半双工 (Half-duplex) 在同一时间只能发送或接收，不能同时进行。",
            difficulty: "EASY"
        },
        {
            content: "True or False: Layer 2 switches separate collision domains but do not separate broadcast domains.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "正确。交换机的每个端口都是一个独立的冲突域，但所有端口默认属于同一个广播域（广播帧会被转发到所有端口）。只有路由器（Layer 3）才能分割广播域。",
            difficulty: "MEDIUM"
        }
    ]

    const layer3Questions = [
        {
            content: "In the context of inter-subnet communication, what is the specific role of the Default Gateway?",
            type: "MCQ",
            options: JSON.stringify(["It assigns IP addresses to hosts dynamically.", "It translates domain names to IP addresses.", "It is the router interface connected to the local subnet used to forward packets to foreign networks.", "It prevents collisions on the local network segment."]),
            correctAnswer: "It is the router interface connected to the local subnet used to forward packets to foreign networks.",
            explanation: "默认网关 (Default Gateway) 是主机通往其他网络（Foreign Subnet）的出口，通常是连接到同一物理网段的路由器接口 IP。",
            difficulty: "MEDIUM"
        },
        {
            content: "When a router receives a packet, which information in the IP header does it use to make a forwarding decision?",
            type: "MCQ",
            options: JSON.stringify(["Source IP address", "Destination IP address", "Source MAC address", "Destination MAC address"]),
            correctAnswer: "Destination IP address",
            explanation: "路由器的路径选择（Path Determination）是基于数据包头中的**目的 IP 地址** (Destination IP) 与路由表进行匹配来实现的。",
            difficulty: "EASY"
        },
        {
            content: "Which of the following represents a 'Private' IP address that is NOT routable on the public Internet?",
            type: "MCQ",
            options: JSON.stringify(["12.0.0.1", "172.32.0.1", "192.168.10.1", "224.0.0.5"]),
            correctAnswer: "192.168.10.1",
            explanation: "192.168.0.0/16 是 Class C 的私有地址范围。172.32.x.x 超出了 Class B 私有地址 (172.16.0.0 - 172.31.255.255) 的范围。",
            difficulty: "MEDIUM"
        },
        {
            content: "During the routing process, as a packet moves from one router to another, which addresses change?",
            type: "MCQ",
            options: JSON.stringify(["Source and Destination IP addresses change.", "Source and Destination MAC addresses change.", "Only the Source IP and Source MAC change.", "Both IP and MAC addresses remain constant."]),
            correctAnswer: "Source and Destination MAC addresses change.",
            explanation: "这是经典的考点。**IP 地址（源和目的）在端到端传输中保持不变**，而**MAC 地址（源和目的）在每一跳（Hop）都会改变**，以适应当前的链路层封装。",
            difficulty: "HARD"
        },
        {
            content: "Which ICMPv6 message is essentially the IPv6 equivalent of an IPv4 ARP Request?",
            type: "MCQ",
            options: JSON.stringify(["Router Solicitation (RS)", "Neighbor Advertisement (NA)", "Neighbor Solicitation (NS)", "Echo Request"]),
            correctAnswer: "Neighbor Solicitation (NS)",
            explanation: "邻居请求 (Neighbor Solicitation, NS) 用于解析邻居的链路层地址 (MAC)，功能等同于 IPv4 的 ARP 请求。",
            difficulty: "MEDIUM"
        },
        {
            content: "In IPv6, which address scope is indicated by the prefix FE80::/10?",
            type: "MCQ",
            options: JSON.stringify(["Global Unicast", "Link-Local Unicast", "Multicast", "Unique Local"]),
            correctAnswer: "Link-Local Unicast",
            explanation: "FE80::/10 是链路本地 (Link-Local) 地址，仅在当前链路上有效，路由器不会转发以此为源或目的的包。",
            difficulty: "EASY"
        },
        {
            content: "What is the purpose of the 'Time-to-Live' (TTL) field in an IPv4 header?",
            type: "MCQ",
            options: JSON.stringify(["To synchronize the clock between sender and receiver.", "To limit the time a packet can exist in the buffer.", "To prevent packets from looping endlessly in the network.", "To determine the retransmission timeout."]),
            correctAnswer: "To prevent packets from looping endlessly in the network.",
            explanation: "TTL 用于防止路由环路。每经过一个路由器 TTL 减 1，减为 0 时丢弃。",
            difficulty: "EASY"
        },
        {
            content: "Which of the following subnet masks represents a '/30' prefix length?",
            type: "MCQ",
            options: JSON.stringify(["255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252"]),
            correctAnswer: "255.255.255.252",
            explanation: "/30 表示有 30 个网络位，剩下 2 个主机位。最后一个字节是 11111100，即 252。",
            difficulty: "MEDIUM"
        },
        {
            content: "When a host boots up and wants to get an IPv6 address automatically, it sends a Router Solicitation (RS) message. What is the destination address of this message?",
            type: "MCQ",
            options: JSON.stringify(["The specific IP of the router (if known).", "FF02::1 (All Nodes).", "FF02::2 (All Routers).", "The broadcast address."]),
            correctAnswer: "FF02::2 (All Routers).",
            explanation: "RS 消息发送给'所有路由器'组播地址 (FF02::2)，请求路由器立即发送 RA (路由通告)。",
            difficulty: "MEDIUM"
        },
        {
            content: "If a routing table has multiple entries matching a destination address, which one will be selected?",
            type: "MCQ",
            options: JSON.stringify(["The one with the shortest prefix length.", "The one with the longest prefix length (Longest Match).", "The first one learned.", "The default route."]),
            correctAnswer: "The one with the longest prefix length (Longest Match).",
            explanation: "路由器遵循'最长匹配原则' (Longest Prefix Match)，即匹配网络位最多的条目优先。",
            difficulty: "MEDIUM"
        },
        {
            content: "VLSM Calculation: You need to configure a point-to-point WAN link between two routers. To save IP addresses, which subnet mask is the most efficient?",
            type: "MCQ",
            options: JSON.stringify(["/24", "/28", "/29", "/30"]),
            correctAnswer: "/30",
            explanation: "点对点链路只需要 2 个可用 IP。公式 2^h - 2 >= 2，所以 h=2。32 - 2 = 30。/30 是最节省的掩码 (提供 4 个地址，2 个可用)。",
            difficulty: "HARD"
        },
        {
            content: "Given the IP address 172.16.11.11/29. What is the Broadcast Address for this subnet?",
            type: "MCQ",
            options: JSON.stringify(["172.16.11.15", "172.16.11.255", "172.16.11.14", "172.16.11.12"]),
            correctAnswer: "172.16.11.15",
            explanation: "/29 块大小是 8。子网划分：0, 8, 16... IP 11 落在 8-15 范围内。网络地址：172.16.11.8。广播地址：172.16.11.15。",
            difficulty: "HARD"
        },
        {
            content: "Host A (192.168.1.10/24) sends a packet to Host B (10.1.1.5/24). Host A's Default Gateway is Router R1 (192.168.1.1). Where does Host A send the Layer 2 frame?",
            type: "MCQ",
            options: JSON.stringify(["Directly to Host B's MAC address.", "To the Broadcast MAC address.", "To Router R1's MAC address.", "It drops the packet because it's on a different subnet."]),
            correctAnswer: "To Router R1's MAC address.",
            explanation: "这是跨子网通信 (Inter-subnet)。主机 A 发现目的 IP 不在本地子网，因此必须将包发送给默认网关 (R1)。二层帧的目的 MAC 地址将是 R1 接口的 MAC。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which of the following IP addresses represents a valid, usable host address on the network 192.168.5.0/26?",
            type: "MCQ",
            options: JSON.stringify(["192.168.5.0", "192.168.5.63", "192.168.5.64", "192.168.5.30"]),
            correctAnswer: "192.168.5.30",
            explanation: "/26 块大小是 64。第一个子网范围：0-63 (0 是网络地址，63 是广播地址)。只有 30 是有效主机地址。",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the size of the IPv6 fixed header compared to the minimum IPv4 header?",
            type: "MCQ",
            options: JSON.stringify(["IPv6 is 20 bytes; IPv4 is 20 bytes.", "IPv6 is 40 bytes; IPv4 is 20 bytes.", "IPv6 is 32 bytes; IPv4 is 20 bytes.", "IPv6 is 64 bytes; IPv4 is 32 bytes."]),
            correctAnswer: "IPv6 is 40 bytes; IPv4 is 20 bytes.",
            explanation: "IPv4 最小头长 20 字节（可变）；IPv6 固定头长 40 字节。虽然 IPv6 头部更长，但结构更简单高效。",
            difficulty: "EASY"
        },
        {
            content: "A PC has the MAC address 00-11-22-33-44-55. What will be the Interface ID portion of its IPv6 address using the EUI-64 format?",
            type: "MCQ",
            options: JSON.stringify(["0011:22FF:FE33:4455", "0211:22FF:FE33:4455", "0011:2233:4455:FFFE", "0211:2233:4455:FFFE"]),
            correctAnswer: "0211:22FF:FE33:4455",
            explanation: "在 MAC 中间插入 FFFE，然后反转第 7 位 (U/L bit)。00 (hex) = 00000000 (bin) -> 00000010 (bin) = 02 (hex)。结果: 0211:22FF:FE33:4455。",
            difficulty: "HARD"
        },
        {
            content: "Perform a logical AND operation to find the Network Address for Host: 172.16.45.15 with Subnet Mask 255.255.240.0 (/20).",
            type: "MCQ",
            options: JSON.stringify(["172.16.40.0", "172.16.32.0", "172.16.45.0", "172.16.0.0"]),
            correctAnswer: "172.16.32.0",
            explanation: "关注第三个字节。45 (IP) = 00101101。Mask 240 = 11110000。AND 结果: 00100000 = 32。网络地址: 172.16.32.0。",
            difficulty: "HARD"
        },
        {
            content: "If PC1 wants to send data to PC2 (same subnet), but PC1's ARP table is empty. What is the first packet/frame sent by PC1?",
            type: "MCQ",
            options: JSON.stringify(["An IP packet to PC2 with the data.", "An ARP Request broadcast (Who has PC2's IP?).", "An ARP Reply unicast.", "A Router Solicitation."]),
            correctAnswer: "An ARP Request broadcast (Who has PC2's IP?).",
            explanation: "在封装数据帧之前，如果不知道目的 MAC，必须先发送 ARP Request（广播）来获取。",
            difficulty: "MEDIUM"
        },
        {
            content: "A router receives a packet for destination 10.1.1.1. Its routing table has: 10.1.0.0/16 -> Interface A, 10.1.1.0/24 -> Interface B, 10.0.0.0/8 -> Interface C. Which interface will the packet use?",
            type: "MCQ",
            options: JSON.stringify(["Interface A", "Interface B", "Interface C", "Default route"]),
            correctAnswer: "Interface B",
            explanation: "最长匹配原则 (Longest Match)。/24 比 /16 和 /8 匹配的位数更多。",
            difficulty: "MEDIUM"
        },
        {
            content: "In a topology where a Router connects 3 Switches, and each Switch connects 2 PCs. How many Broadcast Domains are there?",
            type: "MCQ",
            options: JSON.stringify(["1", "3", "6", "9"]),
            correctAnswer: "3",
            explanation: "路由器分割广播域。路由器有 3 个接口分别连接 3 个交换机网络，因此有 3 个广播域。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which field in the IPv6 header serves a similar purpose to the TOS (Type of Service) field in IPv4?",
            type: "MCQ",
            options: JSON.stringify(["Flow Label", "Traffic Class", "Next Header", "Hop Limit"]),
            correctAnswer: "Traffic Class",
            explanation: "Traffic Class 用于标识数据包的优先级或服务类别。",
            difficulty: "MEDIUM"
        },
        {
            content: "What type of IPv6 address is FF02::1:FFAB:1234?",
            type: "MCQ",
            options: JSON.stringify(["Link-Local Unicast", "Global Unicast", "Solicited-Node Multicast", "All Nodes Multicast"]),
            correctAnswer: "Solicited-Node Multicast",
            explanation: "前缀 FF02::1:FF 是被请求节点组播地址的特征，用于 NDP 中的地址解析和 DAD。",
            difficulty: "HARD"
        },
        {
            content: "If an IPv4 packet is larger than the MTU (Maximum Transmission Unit) of the outgoing interface, what must occur?",
            type: "MCQ",
            options: JSON.stringify(["The packet is dropped.", "Fragmentation occurs.", "The packet is compressed.", "The packet is queued."]),
            correctAnswer: "Fragmentation occurs.",
            explanation: "路由器会将包分成更小的片段 (Fragments)，并在 Flags 和 Fragment Offset 字段做标记。注意：IPv6 路由器不进行分片。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which ICMPv6 message is sent to perform Duplicate Address Detection (DAD)?",
            type: "MCQ",
            options: JSON.stringify(["Router Solicitation (RS)", "Router Advertisement (RA)", "Neighbor Solicitation (NS)", "Neighbor Advertisement (NA)"]),
            correctAnswer: "Neighbor Solicitation (NS)",
            explanation: "主机发送一个 NS 消息查询自己的地址，如果没有收到 NA 回复，说明地址唯一。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: In IPv6, the router modifies the 'Checksum' field in the header at every hop.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "IPv6 头部**取消了 Checksum 字段**（移交给了上层协议如 TCP/UDP 处理），以提高路由器的转发效率。IPv4 才有 Header Checksum。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: A 'Directed Broadcast' (e.g., 192.168.1.255) is sent to all hosts on a specific remote network, whereas a 'Limited Broadcast' (255.255.255.255) is never forwarded by routers.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "定向广播指向特定网络；受限广播 (255.255.255.255) 仅限于本地链路，路由器不转发。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: With Classless Inter-Domain Routing (CIDR) and VLSM, all subnets within a major network must have the same subnet mask.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "这描述的是 Classful subnetting。VLSM (可变长子网掩码) 允许在同一网络中使用不同长度的掩码（如 /30 用于链路，/24 用于 LAN）。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: The IPv6 address ::1 represents the Loopback address.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "::1/128 是 IPv6 的环回地址，相当于 IPv4 的 127.0.0.1。",
            difficulty: "EASY"
        },
        {
            content: "True or False: ARP is used to resolve the IP address when the MAC address is known.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "它是反过来的。ARP 是已知 IP 求 MAC。已知 MAC 求 IP 是 RARP（逆向 ARP）。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: Link-local IPv6 addresses (FE80::/10) are routable and can be forwarded by routers to other networks.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "路由器从不转发链路本地 (Link-local) 流量。这些地址仅在本地链路上有效。",
            difficulty: "EASY"
        }
    ]

    const midtermQuestions = [
        // Part 1: Concept & Protocol
        {
            content: "In the context of inter-subnet communication, what is the specific role of the Default Gateway?",
            type: "MCQ",
            options: JSON.stringify(["It assigns IP addresses to hosts dynamically.", "It translates domain names to IP addresses.", "It is the router interface connected to the local subnet used to forward packets to foreign networks.", "It prevents collisions on the local network segment."]),
            correctAnswer: "It is the router interface connected to the local subnet used to forward packets to foreign networks.",
            explanation: "默认网关 (Default Gateway) 是主机通往其他网络（Foreign Subnet）的出口，通常是连接到同一物理网段的路由器接口 IP。",
            difficulty: "MEDIUM"
        },
        {
            content: "When a router receives a packet, which information in the IP header does it use to make a forwarding decision?",
            type: "MCQ",
            options: JSON.stringify(["Source IP address", "Destination IP address", "Source MAC address", "Destination MAC address"]),
            correctAnswer: "Destination IP address",
            explanation: "路由器的路径选择（Path Determination）是基于数据包头中的**目的 IP 地址** (Destination IP) 与路由表进行匹配来实现的。",
            difficulty: "EASY"
        },
        {
            content: "Which of the following represents a 'Private' IP address that is NOT routable on the public Internet?",
            type: "MCQ",
            options: JSON.stringify(["12.0.0.1", "172.32.0.1", "192.168.10.1", "224.0.0.5"]),
            correctAnswer: "192.168.10.1",
            explanation: "192.168.0.0/16 是 Class C 的私有地址范围。172.32.x.x 超出了 Class B 私有地址 (172.16.0.0 - 172.31.255.255) 的范围。",
            difficulty: "MEDIUM"
        },
        {
            content: "During the routing process, as a packet moves from one router to another, which addresses change?",
            type: "MCQ",
            options: JSON.stringify(["Source and Destination IP addresses change.", "Source and Destination MAC addresses change.", "Only the Source IP and Source MAC change.", "Both IP and MAC addresses remain constant."]),
            correctAnswer: "Source and Destination MAC addresses change.",
            explanation: "这是经典的考点。**IP 地址（源和目的）在端到端传输中保持不变**，而**MAC 地址（源和目的）在每一跳（Hop）都会改变**，以适应当前的链路层封装。",
            difficulty: "HARD"
        },
        {
            content: "Which ICMPv6 message is essentially the IPv6 equivalent of an IPv4 ARP Request?",
            type: "MCQ",
            options: JSON.stringify(["Router Solicitation (RS)", "Neighbor Advertisement (NA)", "Neighbor Solicitation (NS)", "Echo Request"]),
            correctAnswer: "Neighbor Solicitation (NS)",
            explanation: "邻居请求 (Neighbor Solicitation, NS) 用于解析邻居的链路层地址 (MAC)，功能等同于 IPv4 的 ARP 请求。",
            difficulty: "MEDIUM"
        },
        {
            content: "In IPv6, which address scope is indicated by the prefix FE80::/10?",
            type: "MCQ",
            options: JSON.stringify(["Global Unicast", "Link-Local Unicast", "Multicast", "Unique Local"]),
            correctAnswer: "Link-Local Unicast",
            explanation: "FE80::/10 是链路本地 (Link-Local) 地址，仅在当前链路上有效，路由器不会转发以此为源或目的的包。",
            difficulty: "EASY"
        },
        {
            content: "What is the purpose of the 'Time-to-Live' (TTL) field in an IPv4 header?",
            type: "MCQ",
            options: JSON.stringify(["To synchronize the clock between sender and receiver.", "To limit the time a packet can exist in the buffer.", "To prevent packets from looping endlessly in the network.", "To determine the retransmission timeout."]),
            correctAnswer: "To prevent packets from looping endlessly in the network.",
            explanation: "TTL 用于防止路由环路。每经过一个路由器 TTL 减 1，减为 0 时丢弃。",
            difficulty: "EASY"
        },
        {
            content: "Which of the following subnet masks represents a '/30' prefix length?",
            type: "MCQ",
            options: JSON.stringify(["255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252"]),
            correctAnswer: "255.255.255.252",
            explanation: "/30 表示有 30 个网络位，剩下 2 个主机位。最后一个字节是 11111100，即 252。",
            difficulty: "MEDIUM"
        },
        {
            content: "When a host boots up and wants to get an IPv6 address automatically, it sends a Router Solicitation (RS) message. What is the destination address of this message?",
            type: "MCQ",
            options: JSON.stringify(["The specific IP of the router (if known).", "FF02::1 (All Nodes).", "FF02::2 (All Routers).", "The broadcast address."]),
            correctAnswer: "FF02::2 (All Routers).",
            explanation: "RS 消息发送给'所有路由器'组播地址 (FF02::2)，请求路由器立即发送 RA (路由通告)。",
            difficulty: "MEDIUM"
        },
        {
            content: "If a routing table has multiple entries matching a destination address, which one will be selected?",
            type: "MCQ",
            options: JSON.stringify(["The one with the shortest prefix length.", "The one with the longest prefix length (Longest Match).", "The first one learned.", "The default route."]),
            correctAnswer: "The one with the longest prefix length (Longest Match).",
            explanation: "路由器遵循'最长匹配原则' (Longest Prefix Match)，即匹配网络位最多的条目优先。",
            difficulty: "MEDIUM"
        },

        // Part 2: Calculation & Scenario
        {
            content: "VLSM Calculation: You need to configure a point-to-point WAN link between two routers. To save IP addresses, which subnet mask is the most efficient?",
            type: "MCQ",
            options: JSON.stringify(["/24", "/28", "/29", "/30"]),
            correctAnswer: "/30",
            explanation: "点对点链路只需要 2 个可用 IP。公式 2^h - 2 >= 2，所以 h=2。32 - 2 = 30。/30 是最节省的掩码 (提供 4 个地址，2 个可用)。",
            difficulty: "HARD"
        },
        {
            content: "Given the IP address 172.16.11.11/29. What is the Broadcast Address for this subnet?",
            type: "MCQ",
            options: JSON.stringify(["172.16.11.15", "172.16.11.255", "172.16.11.14", "172.16.11.12"]),
            correctAnswer: "172.16.11.15",
            explanation: "/29 块大小是 8。子网划分：0, 8, 16... IP 11 落在 8-15 范围内。网络地址：172.16.11.8。广播地址：172.16.11.15。",
            difficulty: "HARD"
        },
        {
            content: "Host A (192.168.1.10/24) sends a packet to Host B (10.1.1.5/24). Host A's Default Gateway is Router R1 (192.168.1.1). Where does Host A send the Layer 2 frame?",
            type: "MCQ",
            options: JSON.stringify(["Directly to Host B's MAC address.", "To the Broadcast MAC address.", "To Router R1's MAC address.", "It drops the packet because it's on a different subnet."]),
            correctAnswer: "To Router R1's MAC address.",
            explanation: "这是跨子网通信 (Inter-subnet)。主机 A 发现目的 IP 不在本地子网，因此必须将包发送给默认网关 (R1)。二层帧的目的 MAC 地址将是 R1 接口的 MAC。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which of the following IP addresses represents a valid, usable host address on the network 192.168.5.0/26?",
            type: "MCQ",
            options: JSON.stringify(["192.168.5.0", "192.168.5.63", "192.168.5.64", "192.168.5.30"]),
            correctAnswer: "192.168.5.30",
            explanation: "/26 块大小是 64。第一个子网范围：0-63 (0 是网络地址，63 是广播地址)。只有 30 是有效主机地址。",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the size of the IPv6 fixed header compared to the minimum IPv4 header?",
            type: "MCQ",
            options: JSON.stringify(["IPv6 is 20 bytes; IPv4 is 20 bytes.", "IPv6 is 40 bytes; IPv4 is 20 bytes.", "IPv6 is 32 bytes; IPv4 is 20 bytes.", "IPv6 is 64 bytes; IPv4 is 32 bytes."]),
            correctAnswer: "IPv6 is 40 bytes; IPv4 is 20 bytes.",
            explanation: "IPv4 最小头长 20 字节（可变）；IPv6 固定头长 40 字节。虽然 IPv6 头部更长，但结构更简单高效。",
            difficulty: "EASY"
        },
        {
            content: "A PC has the MAC address 00-11-22-33-44-55. What will be the Interface ID portion of its IPv6 address using the EUI-64 format?",
            type: "MCQ",
            options: JSON.stringify(["0011:22FF:FE33:4455", "0211:22FF:FE33:4455", "0011:2233:4455:FFFE", "0211:2233:4455:FFFE"]),
            correctAnswer: "0211:22FF:FE33:4455",
            explanation: "在 MAC 中间插入 FFFE，然后反转第 7 位 (U/L bit)。00 (hex) = 00000000 (bin) -> 00000010 (bin) = 02 (hex)。结果: 0211:22FF:FE33:4455。",
            difficulty: "HARD"
        },
        {
            content: "Perform a logical AND operation to find the Network Address for Host: 172.16.45.15 with Subnet Mask 255.255.240.0 (/20).",
            type: "MCQ",
            options: JSON.stringify(["172.16.40.0", "172.16.32.0", "172.16.45.0", "172.16.0.0"]),
            correctAnswer: "172.16.32.0",
            explanation: "关注第三个字节。45 (IP) = 00101101。Mask 240 = 11110000。AND 结果: 00100000 = 32。网络地址: 172.16.32.0。",
            difficulty: "HARD"
        },
        {
            content: "If PC1 wants to send data to PC2 (same subnet), but PC1's ARP table is empty. What is the first packet/frame sent by PC1?",
            type: "MCQ",
            options: JSON.stringify(["An IP packet to PC2 with the data.", "An ARP Request broadcast (Who has PC2's IP?).", "An ARP Reply unicast.", "A Router Solicitation."]),
            correctAnswer: "An ARP Request broadcast (Who has PC2's IP?).",
            explanation: "在封装数据帧之前，如果不知道目的 MAC，必须先发送 ARP Request（广播）来获取。",
            difficulty: "MEDIUM"
        },
        {
            content: "A router receives a packet for destination 10.1.1.1. Its routing table has: 10.1.0.0/16 -> Interface A, 10.1.1.0/24 -> Interface B, 10.0.0.0/8 -> Interface C. Which interface will the packet use?",
            type: "MCQ",
            options: JSON.stringify(["Interface A", "Interface B", "Interface C", "Default route"]),
            correctAnswer: "Interface B",
            explanation: "最长匹配原则 (Longest Match)。/24 比 /16 和 /8 匹配的位数更多。",
            difficulty: "MEDIUM"
        },
        {
            content: "In a topology where a Router connects 3 Switches, and each Switch connects 2 PCs. How many Broadcast Domains are there?",
            type: "MCQ",
            options: JSON.stringify(["1", "3", "6", "9"]),
            correctAnswer: "3",
            explanation: "路由器分割广播域。路由器有 3 个接口分别连接 3 个交换机网络，因此有 3 个广播域。",
            difficulty: "MEDIUM"
        },

        // Part 3: True/False & Short Concept
        {
            content: "True or False: In IPv6, the router modifies the 'Checksum' field in the header at every hop.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "IPv6 头部**取消了 Checksum 字段**（移交给了上层协议如 TCP/UDP 处理），以提高路由器的转发效率。IPv4 才有 Header Checksum。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: A 'Directed Broadcast' (e.g., 192.168.1.255) is sent to all hosts on a specific remote network, whereas a 'Limited Broadcast' (255.255.255.255) is never forwarded by routers.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "定向广播指向特定网络；受限广播 (255.255.255.255) 仅限于本地链路，路由器不转发。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: With Classless Inter-Domain Routing (CIDR) and VLSM, all subnets within a major network must have the same subnet mask.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "这描述的是 Classful subnetting。VLSM (可变长子网掩码) 允许在同一网络中使用不同长度的掩码（如 /30 用于链路，/24 用于 LAN）。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: The IPv6 address ::1 represents the Loopback address.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "::1/128 是 IPv6 的环回地址，相当于 IPv4 的 127.0.0.1。",
            difficulty: "EASY"
        },
        {
            content: "True or False: ARP is used to resolve the IP address when the MAC address is known.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "它是反过来的。ARP 是已知 IP 求 MAC。已知 MAC 求 IP 是 RARP（逆向 ARP）。",
            difficulty: "MEDIUM"
        },
        {
            content: "The ______ field in the IPv6 header serves a similar purpose to the TOS (Type of Service) field in IPv4.",
            type: "FIB",
            options: null,
            correctAnswer: "Traffic Class",
            explanation: "Traffic Class 用于标识数据包的优先级或服务类别。",
            difficulty: "MEDIUM"
        },
        {
            content: "What type of IPv6 address is FF02::1:FFAB:1234?",
            type: "MCQ",
            options: JSON.stringify(["Link-Local Unicast", "Global Unicast", "Solicited-Node Multicast", "All Nodes Multicast"]),
            correctAnswer: "Solicited-Node Multicast",
            explanation: "前缀 FF02::1:FF 是被请求节点组播地址的特征，用于 NDP 中的地址解析和 DAD。",
            difficulty: "HARD"
        },
        {
            content: "If an IPv4 packet is larger than the MTU (Maximum Transmission Unit) of the outgoing interface, what must occur?",
            type: "MCQ",
            options: JSON.stringify(["The packet is dropped.", "Fragmentation occurs.", "The packet is compressed.", "The packet is queued."]),
            correctAnswer: "Fragmentation occurs.",
            explanation: "路由器会将包分成更小的片段 (Fragments)，并在 Flags 和 Fragment Offset 字段做标记。注意：IPv6 路由器不进行分片。",
            difficulty: "MEDIUM"
        },
        {
            content: "When a routing table has multiple paths to the same destination from different protocols (or same protocol), what value is used to break the tie or determine the 'best' path?",
            type: "MCQ",
            options: JSON.stringify(["Metric (or Administrative Distance)", "Hop Count only", "Bandwidth only", "Random selection"]),
            correctAnswer: "Metric (or Administrative Distance)",
            explanation: "Metric (度量值) 用于衡量路径的优劣（如跳数、带宽等）。管理距离 (AD) 用于在不同协议间仲裁。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which ICMPv6 message is sent to perform Duplicate Address Detection (DAD)?",
            type: "MCQ",
            options: JSON.stringify(["Router Solicitation (RS)", "Router Advertisement (RA)", "Neighbor Solicitation (NS)", "Neighbor Advertisement (NA)"]),
            correctAnswer: "Neighbor Solicitation (NS)",
            explanation: "主机发送一个 NS 消息查询自己的地址，如果没有收到 NA 回复，说明地址唯一。",
            difficulty: "MEDIUM"
        }
    ]

    const routingQuestions = [
        // Part 1: Multiple Choice
        {
            content: "Which of the following is a key characteristic of a Distance Vector routing protocol?",
            type: "MCQ",
            options: JSON.stringify(["It maintains a complete map of the network topology.", "It sends periodic updates of the entire routing table to neighbors.", "It uses the Dijkstra algorithm to calculate the shortest path.", "It only sends updates when a topology change occurs."]),
            correctAnswer: "It sends periodic updates of the entire routing table to neighbors.",
            explanation: "距离矢量协议（如 RIP）周期性地向邻居发送整个路由表，并且通常不知道网络的完整拓扑结构。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which routing protocol is classified as an 'Advanced Distance Vector' or 'Balanced Hybrid' protocol?",
            type: "MCQ",
            options: JSON.stringify(["RIP", "OSPF", "EIGRP", "BGP"]),
            correctAnswer: "EIGRP",
            explanation: "EIGRP (Enhanced Interior Gateway Routing Protocol) 结合了距离矢量和链路状态协议的优点，被称为混合型或高级距离矢量协议。",
            difficulty: "MEDIUM"
        },
        {
            content: "In OSPF, what is the function of a Hello packet?",
            type: "MCQ",
            options: JSON.stringify(["To send routing table updates.", "To request specific link-state information.", "To establish and maintain neighbor relationships (adjacencies).", "To acknowledge the receipt of an LSA."]),
            correctAnswer: "To establish and maintain neighbor relationships (adjacencies).",
            explanation: "Hello 包用于发现邻居并维持邻居关系 (Keepalive)。",
            difficulty: "EASY"
        },
        {
            content: "What metric does OSPF use to determine the best path?",
            type: "MCQ",
            options: JSON.stringify(["Hop count", "Bandwidth (Cost)", "Delay", "Load and Reliability"]),
            correctAnswer: "Bandwidth (Cost)",
            explanation: "OSPF 使用 Cost 作为度量值，Cost 与带宽成反比 (Cost = 10^8 / Bandwidth)。带宽越高，Cost 越低，路径越优。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which problem in Distance Vector protocols is described as 'packets looping continuously around the network'?",
            type: "MCQ",
            options: JSON.stringify(["Split Horizon", "Route Poisoning", "Count to Infinity", "Triggered Updates"]),
            correctAnswer: "Count to Infinity",
            explanation: "'Count to Infinity' (计数到无穷大) 是路由环路的一种表现，跳数会不断增加直到达到最大值。",
            difficulty: "MEDIUM"
        },
        {
            content: "In an OSPF network, which router is elected to manage the exchange of routing information on a multi-access segment (like Ethernet)?",
            type: "MCQ",
            options: JSON.stringify(["Area Border Router (ABR)", "Autonomous System Boundary Router (ASBR)", "Designated Router (DR)", "Backbone Router"]),
            correctAnswer: "Designated Router (DR)",
            explanation: "在多路访问网络中，选举 DR (指定路由器) 和 BDR (备份指定路由器) 可以减少路由信息的交换量。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which protocol is generally preferred if learned via multiple sources (based on sophistication and metric)?",
            type: "MCQ",
            options: JSON.stringify(["RIP (Hops)", "OSPF (Cost)", "EIGRP (Composite)", "They are equal."]),
            correctAnswer: "EIGRP (Composite)",
            explanation: "虽然题目未明确涉及管理距离数值，但 EIGRP 的度量计算最复杂精细（带宽+延迟等），通常被认为比 RIP（仅跳数）更优。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which algorithm is used by Link-State protocols like OSPF to calculate the shortest path tree?",
            type: "MCQ",
            options: JSON.stringify(["Bellman-Ford", "DUAL", "Dijkstra (SPF)", "Diffusing Update Algorithm"]),
            correctAnswer: "Dijkstra (SPF)",
            explanation: "链路状态协议使用 Dijkstra 算法（也称为 SPF 算法）来计算最短路径树。",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the maximum hop count for RIP (Routing Information Protocol) before a network is considered unreachable?",
            type: "MCQ",
            options: JSON.stringify(["15", "16", "100", "255"]),
            correctAnswer: "16",
            explanation: "RIP 的最大跳数是 15。如果跳数达到 16，则认为目标不可达（Infinity）。",
            difficulty: "EASY"
        },
        {
            content: "Which multicast address does an OSPF DR (Designated Router) use to send updates to 'All OSPF Routers'?",
            type: "MCQ",
            options: JSON.stringify(["224.0.0.5", "224.0.0.6", "224.0.0.9", "224.0.0.10"]),
            correctAnswer: "224.0.0.5",
            explanation: "DR 使用 224.0.0.5 (All OSPF Routers) 发送更新给普通路由器。普通路由器发送给 DR/BDR 使用 224.0.0.6。",
            difficulty: "HARD"
        },
        {
            content: "EIGRP uses which algorithm to ensure loop-free paths and calculate backup routes?",
            type: "MCQ",
            options: JSON.stringify(["SPF", "Bellman-Ford", "DUAL (Diffusing Update Algorithm)", "LSA"]),
            correctAnswer: "DUAL (Diffusing Update Algorithm)",
            explanation: "DUAL (扩散更新算法) 是 EIGRP 的核心算法，用于计算 Successor 和 Feasible Successor。",
            difficulty: "MEDIUM"
        },
        {
            content: "In EIGRP, what is a 'Feasible Successor'?",
            type: "MCQ",
            options: JSON.stringify(["The primary best path to a destination.", "A route that is currently active and routing traffic.", "A backup route that is guaranteed to be loop-free.", "A router that cannot reach the destination."]),
            correctAnswer: "A backup route that is guaranteed to be loop-free.",
            explanation: "Feasible Successor 是备份路径。它必须满足可行性条件 (Feasibility Condition, FC)，即其 RD < 当前 Successor 的 FD，从而保证无环路。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which OSPF packet type is used to synchronize the database between routers?",
            type: "MCQ",
            options: JSON.stringify(["Hello", "Database Description (DD)", "Link State Request", "Link State Acknowledgement"]),
            correctAnswer: "Database Description (DD)",
            explanation: "DD (数据库描述) 包用于在邻接关系建立初期交换数据库摘要信息，以便同步 LSDB。",
            difficulty: "MEDIUM"
        },
        {
            content: "What is an Autonomous System (AS)?",
            type: "MCQ",
            options: JSON.stringify(["A single router in a network.", "A collection of networks under a common administration sharing a routing strategy.", "The connection between two ISPs.", "A type of routing protocol."]),
            correctAnswer: "A collection of networks under a common administration sharing a routing strategy.",
            explanation: "自治系统 (AS) 是由单一管理机构控制的一组网络和路由器。",
            difficulty: "EASY"
        },
        {
            content: "If multiple routers on an Ethernet segment have the same OSPF Priority, how is the DR elected?",
            type: "MCQ",
            options: JSON.stringify(["The router with the highest IP address on any interface.", "The router with the lowest Router ID.", "The router with the highest Router ID.", "Randomly."]),
            correctAnswer: "The router with the highest Router ID.",
            explanation: "优先级相同时，Router ID (RID) **最高**的路由器被选举为 DR。",
            difficulty: "MEDIUM"
        },

        // Part 2: Calculation & Scenarios
        {
            content: "What is the OSPF default cost for a Fast Ethernet (100 Mbps) interface? (Reference bandwidth = 10^8 bps)",
            type: "MCQ",
            options: JSON.stringify(["1", "10", "100", "1000"]),
            correctAnswer: "1",
            explanation: "Cost = 10^8 / 100,000,000 = 1。",
            difficulty: "MEDIUM"
        },
        {
            content: "EIGRP Metric Calculation: Bandwidth = 10,000 kbps, Delay = 1000 microseconds. Using default formula (K1=1, K3=1), what is the metric?",
            type: "MCQ",
            options: JSON.stringify(["281,600", "1100", "256,000", "28,160"]),
            correctAnswer: "281,600",
            explanation: "Scaled BW = 1000. Scaled Delay = 100. Metric = (1000 + 100) * 256 = 1100 * 256 = 281,600。",
            difficulty: "HARD"
        },
        {
            content: "EIGRP Feasibility Condition: Route A (Successor) FD=3000, RD=1000. Route B FD=3500, RD=2000. Route C FD=4000, RD=4000. Which route qualifies as a Feasible Successor?",
            type: "MCQ",
            options: JSON.stringify(["Route B only", "Route C only", "Both B and C", "Neither"]),
            correctAnswer: "Route B only",
            explanation: "可行性条件 (FC): RD of Backup < FD of Successor. Route B: RD (2000) < 3000? Yes. Route C: RD (4000) < 3000? No.",
            difficulty: "HARD"
        },
        {
            content: "OSPF DR/BDR Election: Router A (Pri 1, RID 10.1.1.1), Router B (Pri 0, RID 20.2.2.2), Router C (Pri 1, RID 5.5.5.5), Router D (Pri 1, RID 10.1.1.2). Who is the DR?",
            type: "MCQ",
            options: JSON.stringify(["Router A", "Router B", "Router C", "Router D"]),
            correctAnswer: "Router D",
            explanation: "排除 Router B (Priority 0)。比较 RID: 10.1.1.2 > 10.1.1.1 > 5.5.5.5。Router D 拥有最高的 RID，当选 DR。",
            difficulty: "HARD"
        },
        {
            content: "In Distance Vector, if Router A sends 'Network 1 unreachable' but Router B sends 'I can reach Network 1' (old info) back to A, what problem does this cause?",
            type: "MCQ",
            options: JSON.stringify(["Split Horizon", "Routing Loop", "Route Poisoning", "Stable Topology"]),
            correctAnswer: "Routing Loop",
            explanation: "这是一个典型的路由环路 (Routing Loop) 场景，最终可能导致 'Count to Infinity'。",
            difficulty: "MEDIUM"
        },
        {
            content: "You have a large OSPF network. Which Area must all other areas connect to?",
            type: "MCQ",
            options: JSON.stringify(["Area 1", "Area 255", "Area 0 (Backbone)", "Any Area"]),
            correctAnswer: "Area 0 (Backbone)",
            explanation: "所有非骨干区域 (Regular Areas) 必须连接到骨干区域 Area 0 (Backbone Area) 以进行区域间路由。",
            difficulty: "EASY"
        },
        {
            content: "A router receives a packet for 192.168.3.5. Routing table: 192.168.3.0/24 via Port 1 (Metric 5), 192.168.0.0/16 via Port 2 (Metric 1). Which port is used?",
            type: "MCQ",
            options: JSON.stringify(["Port 1", "Port 2", "Load balance both", "Drop"]),
            correctAnswer: "Port 1",
            explanation: "即使 Port 2 的 Metric 更低，路由转发永远优先遵循**最长前缀匹配 (Longest Match)** 原则。/24 比 /16 匹配更长。",
            difficulty: "MEDIUM"
        },
        {
            content: "If you upgrade an interface from 10 Mbps Ethernet to 100 Mbps Fast Ethernet, what happens to the OSPF cost?",
            type: "MCQ",
            options: JSON.stringify(["Increases from 1 to 10.", "Decreases from 10 to 1.", "Stays the same.", "Decreases from 100 to 10."]),
            correctAnswer: "Decreases from 10 to 1.",
            explanation: "Cost = 100/BW(Mbps). 10M -> Cost 10. 100M -> Cost 1。",
            difficulty: "MEDIUM"
        },

        // Part 3: True/False & Short Concept
        {
            content: "True or False: RIP is a Link-State routing protocol.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "RIP 是距离矢量 (Distance Vector) 协议；OSPF 是链路状态协议。",
            difficulty: "EASY"
        },
        {
            content: "True or False: In OSPF, a '2-way' state indicates that bi-directional communication has been established between neighbors.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "收到邻居发来的 Hello 包中包含自己的 RID，标志着进入 2-way 状态，这是建立邻接关系的第一步。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: EIGRP maintains three tables: Neighbor Table, Topology Table, and Routing Table.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "邻居表存邻居信息，拓扑表存所有学习到的路径（包括备份），路由表存最佳路径。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: 'Split Horizon' is a technique where a router sends routing information back out the same interface it was received on.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "Split Horizon 的规则正好相反：**不**把路由信息发回给信息的来源接口，以防止环路。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: OSPF routers flood LSAs (Link State Advertisements) only when there is a network change or every 30 minutes (refresh).",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "链路状态协议（如 OSPF）使用触发更新 (Triggered updates) 和定期的 LSA 刷新，而不是像 RIP 那样周期性发送整个路由表。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: An 'Active' route in EIGRP means the router is currently using it to forward data successfully.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "在 EIGRP 中，**Passive** 状态是好的（稳定状态）；**Active** 状态意味着路由丢失，路由器正在向邻居查询（Query）新路径，处于不稳定状态。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: Administrative Distance is used to rate the trustworthiness of the routing information source (e.g., preferring OSPF over RIP).",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "管理距离 (AD) 用于在不同协议学到相同路由时进行仲裁，AD 值越小越优先。",
            difficulty: "EASY"
        }
    ]

    const transportQuestions = [
        // Part 1: Multiple Choice
        {
            content: "Which of the following is a connection-oriented protocol that provides reliable delivery?",
            type: "MCQ",
            options: JSON.stringify(["IP", "UDP", "TCP", "Ethernet"]),
            correctAnswer: "TCP",
            explanation: "TCP 是面向连接的协议，提供可靠的传输服务，包括重传、排序和流量控制。",
            difficulty: "EASY"
        },
        {
            content: "What is the purpose of the 'Three-way Handshake' in TCP?",
            type: "MCQ",
            options: JSON.stringify(["To terminate a connection.", "To synchronize Initial Sequence Numbers (ISNs) and establish a connection.", "To retransmit lost packets.", "To calculate the checksum."]),
            correctAnswer: "To synchronize Initial Sequence Numbers (ISNs) and establish a connection.",
            explanation: "三次握手的主要目的是同步双方的初始序列号 (ISN) 并建立逻辑连接。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which field in the TCP header is used for Flow Control?",
            type: "MCQ",
            options: JSON.stringify(["Sequence Number", "Acknowledgement Number", "Window", "Urgent Pointer"]),
            correctAnswer: "Window",
            explanation: "Window (窗口) 字段指示发送方目前可以接收多少字节的数据，从而实现流量控制。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which range of port numbers is known as 'Well-known ports'?",
            type: "MCQ",
            options: JSON.stringify(["0 - 1023", "1024 - 49151", "49152 - 65535", "0 - 65535"]),
            correctAnswer: "0 - 1023",
            explanation: "0-1023 是保留给知名服务（如 HTTP, FTP）的熟知端口号。",
            difficulty: "EASY"
        },
        {
            content: "In the TCP 3-way handshake, what flags are set in the second segment sent from the server to the client?",
            type: "MCQ",
            options: JSON.stringify(["SYN only", "ACK only", "SYN and ACK", "FIN and ACK"]),
            correctAnswer: "SYN and ACK",
            explanation: "第二步服务器回复确认 (ACK) 并发送自己的同步请求 (SYN)，所以标志位是 SYN, ACK。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which protocol uses UDP as its transport layer protocol?",
            type: "MCQ",
            options: JSON.stringify(["HTTP", "FTP", "SMTP", "DNS"]),
            correctAnswer: "DNS",
            explanation: "DNS (域名系统) 主要使用 UDP（虽然在区域传输时也用 TCP，但最常见的是 UDP）。其他选项都使用 TCP。",
            difficulty: "MEDIUM"
        },
        {
            content: "What happens if a TCP sender does not receive an acknowledgement (ACK) within a specific timeout period?",
            type: "MCQ",
            options: JSON.stringify(["It assumes the connection is broken and terminates.", "It sends a Reset (RST) packet.", "It retransmits the segment.", "It waits indefinitely."]),
            correctAnswer: "It retransmits the segment.",
            explanation: "TCP 的可靠性机制 (PAR) 规定，如果超时未收到 ACK，发送方会重传数据段。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which mechanism allows a TCP receiver to tell the sender to 'slow down' because its buffer is full?",
            type: "MCQ",
            options: JSON.stringify(["Congestion Avoidance", "Flow Control (Sliding Window)", "Error Correction", "Sequence Numbering"]),
            correctAnswer: "Flow Control (Sliding Window)",
            explanation: "流量控制通过滑动窗口机制，允许接收方通告较小的窗口值甚至 0 窗口，让发送方减慢或暂停发送。",
            difficulty: "MEDIUM"
        },
        {
            content: "What is the main advantage of UDP over TCP?",
            type: "MCQ",
            options: JSON.stringify(["Guaranteed delivery.", "Ordered delivery.", "Low overhead and speed.", "Flow control."]),
            correctAnswer: "Low overhead and speed.",
            explanation: "UDP 头部开销小（8字节 vs TCP 20字节），且没有握手过程，传输速度快，适合实时应用。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which command can be used on a host to list active TCP connections?",
            type: "MCQ",
            options: JSON.stringify(["ping", "ipconfig", "netstat", "tracert"]),
            correctAnswer: "netstat",
            explanation: "netstat 命令用于显示网络连接、路由表和网络接口统计信息。",
            difficulty: "EASY"
        },
        {
            content: "In TCP connection termination, how many steps (segments) are typically exchanged?",
            type: "MCQ",
            options: JSON.stringify(["2", "3", "4", "5"]),
            correctAnswer: "4",
            explanation: "正常的终止过程通常涉及 4 个步骤：FIN -> ACK (由一方发起)，然后 FIN -> ACK (由另一方发起)。也就是两次双向握手。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which port number is associated with the HTTPS service?",
            type: "MCQ",
            options: JSON.stringify(["80", "21", "23", "443"]),
            correctAnswer: "443",
            explanation: "HTTPS 使用端口 443；HTTP 使用 80；FTP 使用 21；Telnet 使用 23。",
            difficulty: "EASY"
        },
        {
            content: "What does the 'Sequence Number' in a TCP header represent?",
            type: "MCQ",
            options: JSON.stringify(["The number of packets sent.", "The byte number of the first byte of data in the segment.", "The port number of the destination.", "The number of errors detected."]),
            correctAnswer: "The byte number of the first byte of data in the segment.",
            explanation: "序列号用于对数据字节进行编号，确保接收方能按正确顺序重组数据。它表示该段数据中第一个字节的编号。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which flag is used to 'Reset' a connection in TCP?",
            type: "MCQ",
            options: JSON.stringify(["PSH", "URG", "RST", "FIN"]),
            correctAnswer: "RST",
            explanation: "RST (Reset) 标志用于强制重置连接，通常在出现错误或拒绝连接时使用。",
            difficulty: "MEDIUM"
        },
        {
            content: "If a TCP connection has a Window Size of 3000 bytes, and the sender transmits 1000 bytes. What can the sender do next?",
            type: "MCQ",
            options: JSON.stringify(["Wait for an ACK for the 1000 bytes.", "Immediately send another 2000 bytes without waiting for an ACK.", "Close the connection.", "Increase the window size."]),
            correctAnswer: "Immediately send another 2000 bytes without waiting for an ACK.",
            explanation: "滑动窗口允许发送方在收到 ACK 之前发送窗口大小允许的数据量。3000 - 1000 = 2000，还可以发 2000 字节。",
            difficulty: "HARD"
        },

        // Part 2: Scenario & Calculation
        {
            content: "Host A sends a SYN with Sequence Number (Seq) = 100. Host B responds with a SYN-ACK. What will be the Acknowledgment Number (Ack) in Host B's response?",
            type: "MCQ",
            options: JSON.stringify(["100", "101", "0", "Random number"]),
            correctAnswer: "101",
            explanation: "确认号 (Ack) 总是表示“期待收到的下一个字节的序号”。对于 SYN 包（虽然不带数据但消耗一个序列号），Ack = Seq + 1。所以是 101。",
            difficulty: "MEDIUM"
        },
        {
            content: "A web browser (client) opens a webpage. Which pair of ports represents this connection?",
            type: "MCQ",
            options: JSON.stringify(["Source: 80, Destination: 80", "Source: 49152 (Dynamic), Destination: 80 (Well-known)", "Source: 80 (Well-known), Destination: 49152 (Dynamic)", "Source: 21, Destination: 80"]),
            correctAnswer: "Source: 49152 (Dynamic), Destination: 80 (Well-known)",
            explanation: "客户端使用动态/私有端口（如 49152），服务器使用知名端口（HTTP 为 80）。请求是从客户端发往服务器的，所以源是动态端口，目的是 80。",
            difficulty: "MEDIUM"
        },
        {
            content: "Host A sends 3 segments of 100 bytes each to Host B. Host B receives all 3 but its buffer can only process 100 bytes immediately. What Window Size value should Host B likely advertise in this ACK?",
            type: "MCQ",
            options: JSON.stringify(["300", "0", "Smaller value (e.g., 100 or 0)", "Larger value"]),
            correctAnswer: "Smaller value (e.g., 100 or 0)",
            explanation: "接收方通过通告较小的窗口值来实施流量控制。如果缓冲区快满了，它会减小窗口值，甚至设为 0（停止发送）。",
            difficulty: "MEDIUM"
        },
        {
            content: "How does the Transport Layer differentiate between an email being received and a web page being loaded at the same time on the same computer?",
            type: "MCQ",
            options: JSON.stringify(["By IP address.", "By MAC address.", "By Port number.", "By Sequence number."]),
            correctAnswer: "By Port number.",
            explanation: "端口号用于区分同一台主机上运行的不同应用程序或服务（复用/解复用）。",
            difficulty: "EASY"
        },
        {
            content: "Host A sends Segment 1 (Seq 100, Len 100) and Segment 2 (Seq 200, Len 100). Host B receives Segment 2 but Segment 1 is lost. What ACK number will Host B typically send back?",
            type: "MCQ",
            options: JSON.stringify(["200", "300", "100", "101"]),
            correctAnswer: "100",
            explanation: "TCP 使用累积确认。接收方确认的是**按序收到的最后一个字节的下一个序号**。因为 Segment 1 丢失，接收方只能期待 Seq 100，所以它会发送 ACK 100。",
            difficulty: "HARD"
        },
        {
            content: "An application has 2000 bytes of data to send. The network limits the PDU size to 1500 bytes (Ethernet MTU). What does the Transport layer do?",
            type: "MCQ",
            options: JSON.stringify(["Compresses the data.", "Discards the excess data.", "Segments the data into two blocks.", "Sends it as is and lets the router fragment it."]),
            correctAnswer: "Segments the data into two blocks.",
            explanation: "传输层会将大数据块分割（Segmentation）成适合传输的小块（Segments）。",
            difficulty: "MEDIUM"
        },
        {
            content: "Which header is smaller and simpler?",
            type: "MCQ",
            options: JSON.stringify(["TCP Header (20 bytes)", "UDP Header (8 bytes)", "IP Header (20 bytes)", "Ethernet Header (18 bytes)"]),
            correctAnswer: "UDP Header (8 bytes)",
            explanation: "UDP 只有 8 字节头，非常轻量。TCP 至少 20 字节。",
            difficulty: "EASY"
        },
        {
            content: "Which of the following applications typically uses UDP?",
            type: "MCQ",
            options: JSON.stringify(["Email (SMTP)", "Web Browsing (HTTP)", "File Transfer (FTP)", "TFTP (Trivial File Transfer Protocol)"]),
            correctAnswer: "TFTP (Trivial File Transfer Protocol)",
            explanation: "TFTP 是简单文件传输协议，为了简单高效，使用 UDP。",
            difficulty: "MEDIUM"
        },

        // Part 3: True/False & Short Concept
        {
            content: "True or False: UDP provides sequence numbers to reorder packets that arrive out of order.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "UDP 头部没有序列号字段，因此无法对乱序到达的数据报进行重组。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: A 'Socket' is a combination of an IP address and a Port number.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "Socket（套接字）由 IP 地址和端口号组成，唯一标识网络中的一个进程。",
            difficulty: "EASY"
        },
        {
            content: "True or False: The FIN flag is used to initiate a connection.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "SYN 用于发起连接；FIN 用于终止连接。",
            difficulty: "EASY"
        },
        {
            content: "True or False: UDP is preferred for Voice over IP (VoIP) and streaming video because retransmitting lost packets causes unacceptable delays.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "实时应用（如语音视频）对延迟敏感，宁可丢包也不愿等待重传，因此首选 UDP。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: In TCP, 'Expectational Acknowledgement' means the ACK number indicates the last byte successfully received.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "它是指 ACK 号码表示**期待接收的下一个字节** (Next expected TCP octet)，而不是已经收到的最后一个。",
            difficulty: "MEDIUM"
        },
        {
            content: "True or False: Port 21 is a Well-Known port for Telnet.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "False",
            explanation: "端口 21 是 FTP；Telnet 使用端口 23。",
            difficulty: "EASY"
        },
        {
            content: "True or False: Congestion at a destination host can occur if multiple computers simultaneously send data to it.",
            type: "TF",
            options: JSON.stringify(["True", "False"]),
            correctAnswer: "True",
            explanation: "当多个源同时向一个目的地发送数据，超过其处理能力时，会发生拥塞。",
            difficulty: "MEDIUM"
        }
    ]

    for (const [index, ch] of chapters.entries()) {
        let questionsToCreate: {
            content: string;
            type: string;
            options: string | null;
            correctAnswer: string;
            explanation: string;
            difficulty: string;
        }[] = [
                {
                    content: `Sample question for ${ch.title}?`,
                    type: 'MCQ',
                    options: JSON.stringify(['Option A', 'Option B', 'Option C', 'Option D']),
                    correctAnswer: 'Option A',
                    explanation: 'This is a placeholder explanation.',
                    difficulty: 'EASY'
                }
            ];

        if (ch.title === '计算机网络和因特网') {
            questionsToCreate = chapter1Questions;
        } else if (ch.title === '第一、二层：物理层与数据链路层技术') {
            questionsToCreate = chapter2Questions;
        } else if (ch.title === '第三层：网络层技术') {
            questionsToCreate = layer3Questions;
        } else if (ch.title === '计网 I 期中复习专题') {
            questionsToCreate = midtermQuestions;
        } else if (ch.title === '第三层：路由协议') {
            questionsToCreate = routingQuestions;
        } else if (ch.title === '第四层：传输层功能与协议') {
            questionsToCreate = transportQuestions;
        }

        await prisma.chapter.create({
            data: {
                title: ch.title,
                category: ch.category,
                order: index + 1,
                externalLink: ch.link,
                topics: {
                    create: [
                        {
                            title: `${ch.title} - Key Concepts`,
                            summary: `Summary for ${ch.title}. Click the chapter to read full details on hoyue.fun.`,
                            questions: {
                                create: questionsToCreate
                            }
                        }
                    ]
                }
            }
        })
    }

    console.log('Seeding completed.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
