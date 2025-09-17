import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const translations = {
  ru: {
    title: "CENTER DAO",
    subtitle: "Децентрализованная автономная организация будущего",
    home: "Главная",
    governance: "Управление", 
    proposals: "Предложения",
    tokenomics: "Токеномика",
    community: "Сообщество",
    docs: "Документация",
    totalValue: "Общая стоимость",
    activeProposals: "Активные предложения", 
    members: "Участники",
    treasuryBalance: "Баланс казны",
    vote: "Голосовать",
    proposalTitle1: "Расширение экосистемы DeFi",
    proposalDesc1: "Предложение о выделении 1M токенов на разработку новых DeFi протоколов",
    proposalTitle2: "Партнерство с Layer 2",
    proposalDesc2: "Интеграция с решениями масштабирования для снижения комиссий",
    proposalTitle3: "Программа грантов",
    proposalDesc3: "Запуск программы грантов для поддержки разработчиков",
    circulating: "В обращении",
    staked: "Застейкано",
    treasury: "Казна",
    burned: "Сожжено",
    joinCommunity: "Присоединиться к сообществу",
    readDocs: "Читать документацию",
    language: "Язык",
    viewDetails: "Подробнее",
    proposalDetails: "Детали предложения",
    votingEnds: "Голосование завершается",
    totalVotes: "Всего голосов",
    votingPower: "Сила голоса",
    discussion: "Обсуждение",
    voteFor: "За",
    voteAgainst: "Против",
    close: "Закрыть"
  },
  en: {
    title: "CENTER DAO",
    subtitle: "Decentralized Autonomous Organization of the Future",
    home: "Home",
    governance: "Governance",
    proposals: "Proposals", 
    tokenomics: "Tokenomics",
    community: "Community",
    docs: "Documentation",
    totalValue: "Total Value",
    activeProposals: "Active Proposals",
    members: "Members", 
    treasuryBalance: "Treasury Balance",
    vote: "Vote",
    proposalTitle1: "DeFi Ecosystem Expansion",
    proposalDesc1: "Proposal to allocate 1M tokens for new DeFi protocol development",
    proposalTitle2: "Layer 2 Partnership", 
    proposalDesc2: "Integration with scaling solutions to reduce transaction fees",
    proposalTitle3: "Grant Program",
    proposalDesc3: "Launch grant program to support developers",
    circulating: "Circulating",
    staked: "Staked",
    treasury: "Treasury", 
    burned: "Burned",
    joinCommunity: "Join Community",
    readDocs: "Read Documentation",
    language: "Language",
    viewDetails: "View Details",
    proposalDetails: "Proposal Details",
    votingEnds: "Voting ends",
    totalVotes: "Total votes",
    votingPower: "Voting power",
    discussion: "Discussion",
    voteFor: "For",
    voteAgainst: "Against",
    close: "Close"
  },
  es: {
    title: "CENTER DAO",
    subtitle: "Organización Autónoma Descentralizada del Futuro",
    home: "Inicio",
    governance: "Gobernanza",
    proposals: "Propuestas",
    tokenomics: "Tokenómica",
    community: "Comunidad", 
    docs: "Documentación",
    totalValue: "Valor Total",
    activeProposals: "Propuestas Activas",
    members: "Miembros",
    treasuryBalance: "Balance del Tesoro",
    vote: "Votar",
    proposalTitle1: "Expansión del Ecosistema DeFi",
    proposalDesc1: "Propuesta para asignar 1M tokens para desarrollo de nuevos protocolos DeFi",
    proposalTitle2: "Asociación Layer 2",
    proposalDesc2: "Integración con soluciones de escalado para reducir comisiones",
    proposalTitle3: "Programa de Becas",
    proposalDesc3: "Lanzar programa de becas para apoyar desarrolladores",
    circulating: "Circulando",
    staked: "Apostado",
    treasury: "Tesoro",
    burned: "Quemado",
    joinCommunity: "Unirse a la Comunidad",
    readDocs: "Leer Documentación",
    language: "Idioma"
  },
  fr: {
    title: "CENTER DAO",
    subtitle: "Organisation Autonome Décentralisée du Futur",
    home: "Accueil",
    governance: "Gouvernance",
    proposals: "Propositions",
    tokenomics: "Tokénomique",
    community: "Communauté",
    docs: "Documentation",
    totalValue: "Valeur Totale",
    activeProposals: "Propositions Actives",
    members: "Membres",
    treasuryBalance: "Solde du Trésor",
    vote: "Voter",
    proposalTitle1: "Expansion de l'Écosystème DeFi",
    proposalDesc1: "Proposition d'allouer 1M tokens pour le développement de nouveaux protocoles DeFi",
    proposalTitle2: "Partenariat Layer 2",
    proposalDesc2: "Intégration avec des solutions de mise à l'échelle pour réduire les frais",
    proposalTitle3: "Programme de Subventions",
    proposalDesc3: "Lancer un programme de subventions pour soutenir les développeurs",
    circulating: "En Circulation",
    staked: "Misé",
    treasury: "Trésor",
    burned: "Brûlé",
    joinCommunity: "Rejoindre la Communauté",
    readDocs: "Lire la Documentation",
    language: "Langue"
  },
  de: {
    title: "CENTER DAO",
    subtitle: "Dezentrale Autonome Organisation der Zukunft",
    home: "Startseite",
    governance: "Governance",
    proposals: "Vorschläge",
    tokenomics: "Tokenomics",
    community: "Gemeinschaft",
    docs: "Dokumentation",
    totalValue: "Gesamtwert",
    activeProposals: "Aktive Vorschläge",
    members: "Mitglieder",
    treasuryBalance: "Treasury-Saldo",
    vote: "Abstimmen",
    proposalTitle1: "DeFi-Ökosystem-Erweiterung",
    proposalDesc1: "Vorschlag zur Zuteilung von 1M Token für die Entwicklung neuer DeFi-Protokolle",
    proposalTitle2: "Layer-2-Partnerschaft",
    proposalDesc2: "Integration mit Skalierungslösungen zur Reduzierung von Transaktionsgebühren",
    proposalTitle3: "Förderprogramm",
    proposalDesc3: "Start eines Förderprogramms zur Unterstützung von Entwicklern",
    circulating: "Im Umlauf",
    staked: "Gestakt",
    treasury: "Treasury",
    burned: "Verbrannt",
    joinCommunity: "Der Gemeinschaft beitreten",
    readDocs: "Dokumentation lesen",
    language: "Sprache"
  },
  it: {
    title: "CENTER DAO",
    subtitle: "Organizzazione Autonoma Decentralizzata del Futuro",
    home: "Home",
    governance: "Governance",
    proposals: "Proposte",
    tokenomics: "Tokenomics",
    community: "Comunità",
    docs: "Documentazione",
    totalValue: "Valore Totale",
    activeProposals: "Proposte Attive",
    members: "Membri",
    treasuryBalance: "Saldo del Tesoro",
    vote: "Vota",
    proposalTitle1: "Espansione Ecosistema DeFi",
    proposalDesc1: "Proposta per allocare 1M token per lo sviluppo di nuovi protocolli DeFi",
    proposalTitle2: "Partnership Layer 2",
    proposalDesc2: "Integrazione con soluzioni di scaling per ridurre le commissioni",
    proposalTitle3: "Programma di Sovvenzioni",
    proposalDesc3: "Lanciare un programma di sovvenzioni per supportare gli sviluppatori",
    circulating: "Circolante",
    staked: "In Staking",
    treasury: "Tesoro",
    burned: "Bruciato",
    joinCommunity: "Unisciti alla Comunità",
    readDocs: "Leggi la Documentazione",
    language: "Lingua"
  },
  pt: {
    title: "CENTER DAO",
    subtitle: "Organização Autônoma Descentralizada do Futuro",
    home: "Início",
    governance: "Governança",
    proposals: "Propostas",
    tokenomics: "Tokenomics",
    community: "Comunidade",
    docs: "Documentação",
    totalValue: "Valor Total",
    activeProposals: "Propostas Ativas",
    members: "Membros",
    treasuryBalance: "Saldo do Tesouro",
    vote: "Votar",
    proposalTitle1: "Expansão do Ecossistema DeFi",
    proposalDesc1: "Proposta para alocar 1M tokens para desenvolvimento de novos protocolos DeFi",
    proposalTitle2: "Parceria Layer 2",
    proposalDesc2: "Integração com soluções de escalabilidade para reduzir taxas",
    proposalTitle3: "Programa de Bolsas",
    proposalDesc3: "Lançar programa de bolsas para apoiar desenvolvedores",
    circulating: "Circulante",
    staked: "Em Staking",
    treasury: "Tesouro",
    burned: "Queimado",
    joinCommunity: "Juntar-se à Comunidade",
    readDocs: "Ler Documentação",
    language: "Idioma"
  },
  zh: {
    title: "CENTER DAO",
    subtitle: "未来的去中心化自治组织",
    home: "首页",
    governance: "治理",
    proposals: "提案",
    tokenomics: "代币经济",
    community: "社区",
    docs: "文档",
    totalValue: "总价值",
    activeProposals: "活跃提案",
    members: "成员",
    treasuryBalance: "国库余额",
    vote: "投票",
    proposalTitle1: "DeFi生态扩展",
    proposalDesc1: "提议分配100万代币用于新DeFi协议开发",
    proposalTitle2: "Layer 2合作",
    proposalDesc2: "与扩容解决方案集成以降低交易费用",
    proposalTitle3: "资助计划",
    proposalDesc3: "启动资助计划支持开发者",
    circulating: "流通中",
    staked: "质押",
    treasury: "国库",
    burned: "销毁",
    joinCommunity: "加入社区",
    readDocs: "阅读文档",
    language: "语言"
  },
  ja: {
    title: "CENTER DAO",
    subtitle: "未来の分散型自律組織",
    home: "ホーム",
    governance: "ガバナンス",
    proposals: "提案",
    tokenomics: "トークノミクス",
    community: "コミュニティ",
    docs: "ドキュメント",
    totalValue: "総価値",
    activeProposals: "アクティブ提案",
    members: "メンバー",
    treasuryBalance: "国庫残高",
    vote: "投票",
    proposalTitle1: "DeFiエコシステム拡張",
    proposalDesc1: "新しいDeFiプロトコル開発のため100万トークン配分提案",
    proposalTitle2: "Layer 2パートナーシップ",
    proposalDesc2: "取引手数料削減のためのスケーリングソリューション統合",
    proposalTitle3: "助成金プログラム",
    proposalDesc3: "開発者支援のための助成金プログラム開始",
    circulating: "流通中",
    staked: "ステーキング",
    treasury: "国庫",
    burned: "バーン済み",
    joinCommunity: "コミュニティ参加",
    readDocs: "ドキュメント読む",
    language: "言語"
  },
  ko: {
    title: "CENTER DAO",
    subtitle: "미래의 탈중앙화 자율 조직",
    home: "홈",
    governance: "거버넌스",
    proposals: "제안",
    tokenomics: "토케노믹스",
    community: "커뮤니티",
    docs: "문서",
    totalValue: "총 가치",
    activeProposals: "활성 제안",
    members: "구성원",
    treasuryBalance: "국고 잔액",
    vote: "투표",
    proposalTitle1: "DeFi 생태계 확장",
    proposalDesc1: "새로운 DeFi 프로토콜 개발을 위한 100만 토큰 할당 제안",
    proposalTitle2: "Layer 2 파트너십",
    proposalDesc2: "거래 수수료 절감을 위한 스케일링 솔루션 통합",
    proposalTitle3: "보조금 프로그램",
    proposalDesc3: "개발자 지원을 위한 보조금 프로그램 시작",
    circulating: "유통중",
    staked: "스테이킹",
    treasury: "국고",
    burned: "소각됨",
    joinCommunity: "커뮤니티 참여",
    readDocs: "문서 읽기",
    language: "언어"
  }
};

const languageNames = {
  ru: "Русский",
  en: "English", 
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português", 
  zh: "中文",
  ja: "日本語",
  ko: "한국어"
};

export default function Index() {
  const [currentLang, setCurrentLang] = useState<keyof typeof translations>('ru');
  const [votedProposals, setVotedProposals] = useState<Set<number>>(new Set());
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  
  const t = translations[currentLang];

  const handleVote = (proposalId: number) => {
    setVotedProposals(prev => new Set([...prev, proposalId]));
  };

  const proposals = [
    {
      id: 1,
      title: t.proposalTitle1,
      description: t.proposalDesc1,
      fullDescription: "This comprehensive proposal aims to allocate 1,000,000 CENTER tokens to fund the development of innovative DeFi protocols within our ecosystem. The allocation will support research and development of yield farming protocols, automated market makers, and lending platforms that integrate seamlessly with CENTER DAO's governance framework. Expected timeline: 6 months with quarterly progress reviews.",
      votes: 75,
      totalVotes: 2500000,
      votingEnds: "2024-01-15",
      status: "active",
      proposer: "0x742d...3f8a",
      votingPower: 125000,
      comments: [
        { author: "DevCommunity", avatar: "DC", text: "This will revolutionize our DeFi capabilities!", time: "2h ago" },
        { author: "TokenHolder", avatar: "TH", text: "Strong support for this initiative", time: "5h ago" }
      ]
    },
    {
      id: 2, 
      title: t.proposalTitle2,
      description: t.proposalDesc2,
      fullDescription: "Integration proposal for Layer 2 scaling solutions including Polygon, Arbitrum, and Optimism. This partnership will reduce transaction costs by up to 90% while maintaining security and decentralization. The integration includes cross-chain bridge development, liquidity incentives, and governance token migration tools.",
      votes: 60,
      totalVotes: 1800000,
      votingEnds: "2024-01-20",
      status: "active",
      proposer: "0x9a1b...7e2c",
      votingPower: 98000,
      comments: [
        { author: "ScalingExpert", avatar: "SE", text: "Layer 2 is the future of DeFi", time: "1h ago" },
        { author: "CommunityMod", avatar: "CM", text: "Great technical analysis provided", time: "3h ago" }
      ]
    },
    {
      id: 3,
      title: t.proposalTitle3,
      description: t.proposalDesc3,
      fullDescription: "Launch of a comprehensive grant program allocating 500,000 CENTER tokens annually to support developers building on our platform. Grants will range from 5,000 to 50,000 tokens based on project scope and impact. Priority areas include DeFi tools, governance improvements, and community applications.",
      votes: 85,
      totalVotes: 3200000,
      votingEnds: "2024-01-10",
      status: "active",
      proposer: "0x4c7d...9b1f",
      votingPower: 156000,
      comments: [
        { author: "BuilderDAO", avatar: "BD", text: "Essential for ecosystem growth", time: "30m ago" },
        { author: "InnovateNow", avatar: "IN", text: "Will attract top talent to CENTER", time: "2h ago" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-lg bg-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-dao-purple rounded-lg flex items-center justify-center">
                  <Icon name="Hexagon" className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">{t.title}</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                {[t.home, t.governance, t.proposals, t.tokenomics, t.community, t.docs].map((item, index) => (
                  <button key={index} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={currentLang} onValueChange={(value: keyof typeof translations) => setCurrentLang(value)}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languageNames).map(([code, name]) => (
                    <SelectItem key={code} value={code}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button className="bg-gradient-to-r from-electric-blue to-dao-purple hover:from-blue-600 hover:to-purple-600 text-white">
                <Icon name="Wallet" className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-electric-blue via-dao-purple to-blockchain-green bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-electric-blue to-dao-purple hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3">
                <Icon name="Users" className="w-5 h-5 mr-2" />
                {t.joinCommunity}
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3">
                <Icon name="FileText" className="w-5 h-5 mr-2" />
                {t.readDocs}
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up">
            {[
              { label: t.totalValue, value: "$142.5M", icon: "TrendingUp" },
              { label: t.activeProposals, value: "23", icon: "Vote" },
              { label: t.members, value: "15.2K", icon: "Users" },
              { label: t.treasuryBalance, value: "$45.8M", icon: "Vault" }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-electric-blue to-dao-purple rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name={stat.icon as any} className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="governance" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
            <TabsTrigger value="governance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-dao-purple data-[state=active]:text-white">
              {t.governance}
            </TabsTrigger>
            <TabsTrigger value="proposals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-dao-purple data-[state=active]:text-white">
              {t.proposals}
            </TabsTrigger>
            <TabsTrigger value="tokenomics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-dao-purple data-[state=active]:text-white">
              {t.tokenomics}
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-dao-purple data-[state=active]:text-white">
              {t.community}
            </TabsTrigger>
          </TabsList>

          {/* Governance Tab */}
          <TabsContent value="governance" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t.governance}</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Participate in decentralized governance and shape the future of CENTER DAO
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-blockchain-green text-blockchain-green">
                        {proposal.status}
                      </Badge>
                      <span className="text-sm text-gray-400">#{proposal.id}</span>
                    </div>
                    <CardTitle className="text-white text-lg">{proposal.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {proposal.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-2">
                          <span>Support</span>
                          <span>{proposal.votes}%</span>
                        </div>
                        <Progress value={proposal.votes} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                              <Icon name="Eye" className="w-4 h-4 mr-2" />
                              {t.viewDetails}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/10 text-white">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold text-white">
                                {proposal.title}
                              </DialogTitle>
                              <DialogDescription className="text-gray-300 text-lg">
                                {t.proposalDetails} #{proposal.id}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6 mt-6">
                              {/* Proposal Status */}
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="border-blockchain-green text-blockchain-green">
                                  {proposal.status}
                                </Badge>
                                <div className="text-sm text-gray-400">
                                  {t.votingEnds}: {proposal.votingEnds}
                                </div>
                              </div>
                              
                              {/* Full Description */}
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                                <p className="text-gray-300 leading-relaxed">{proposal.fullDescription}</p>
                              </div>
                              
                              {/* Voting Stats */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-white/5 border-white/10">
                                  <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-blockchain-green">{proposal.votes}%</div>
                                    <div className="text-sm text-gray-400">Support</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                  <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-white">{proposal.totalVotes.toLocaleString()}</div>
                                    <div className="text-sm text-gray-400">{t.totalVotes}</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                  <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-dao-purple">{proposal.votingPower.toLocaleString()}</div>
                                    <div className="text-sm text-gray-400">{t.votingPower}</div>
                                  </CardContent>
                                </Card>
                              </div>
                              
                              {/* Detailed Voting */}
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Voting Results</h3>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                                      <span className="flex items-center">
                                        <Icon name="ThumbsUp" className="w-4 h-4 mr-1 text-blockchain-green" />
                                        {t.voteFor}
                                      </span>
                                      <span>{proposal.votes}% ({Math.round(proposal.totalVotes * proposal.votes / 100).toLocaleString()} votes)</span>
                                    </div>
                                    <Progress value={proposal.votes} className="h-3" />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                                      <span className="flex items-center">
                                        <Icon name="ThumbsDown" className="w-4 h-4 mr-1 text-red-400" />
                                        {t.voteAgainst}
                                      </span>
                                      <span>{100 - proposal.votes}% ({Math.round(proposal.totalVotes * (100 - proposal.votes) / 100).toLocaleString()} votes)</span>
                                    </div>
                                    <Progress value={100 - proposal.votes} className="h-3" />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Discussion */}
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-4">{t.discussion}</h3>
                                <div className="space-y-4">
                                  {proposal.comments.map((comment, index) => (
                                    <div key={index} className="flex space-x-3 p-4 bg-white/5 rounded-lg">
                                      <Avatar className="w-10 h-10">
                                        <AvatarFallback className="bg-gradient-to-r from-electric-blue to-dao-purple text-white text-sm">
                                          {comment.avatar}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <span className="font-medium text-white">{comment.author}</span>
                                          <span className="text-xs text-gray-400">{comment.time}</span>
                                        </div>
                                        <p className="text-gray-300">{comment.text}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Voting Actions */}
                              <Separator className="border-white/10" />
                              <div className="flex space-x-4">
                                <Button 
                                  className="flex-1 bg-gradient-to-r from-blockchain-green to-electric-blue hover:from-green-600 hover:to-blue-600 text-white"
                                  disabled={votedProposals.has(proposal.id)}
                                  onClick={() => handleVote(proposal.id)}
                                >
                                  <Icon name="ThumbsUp" className="w-4 h-4 mr-2" />
                                  {t.voteFor}
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="flex-1 border-red-400 text-red-400 hover:bg-red-400/10"
                                  disabled={votedProposals.has(proposal.id)}
                                >
                                  <Icon name="ThumbsDown" className="w-4 h-4 mr-2" />
                                  {t.voteAgainst}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-electric-blue to-dao-purple hover:from-blue-600 hover:to-purple-600 text-white"
                          disabled={votedProposals.has(proposal.id)}
                          onClick={() => handleVote(proposal.id)}
                        >
                          <Icon name="Vote" className="w-4 h-4 mr-2" />
                          {votedProposals.has(proposal.id) ? "Voted" : t.vote}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t.proposals}</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Active governance proposals requiring community votes
              </p>
            </div>
            
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="bg-white/5 border-white/10 backdrop-blur-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge variant="outline" className="border-blockchain-green text-blockchain-green">
                            Active
                          </Badge>
                          <span className="text-sm text-gray-400">Proposal #{proposal.id}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{proposal.title}</h3>
                        <p className="text-gray-300 mb-4">{proposal.description}</p>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blockchain-green">{proposal.votes}%</div>
                            <div className="text-sm text-gray-400">For</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-400">{100 - proposal.votes}%</div>
                            <div className="text-sm text-gray-400">Against</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-400">2.5M</div>
                            <div className="text-sm text-gray-400">Total Votes</div>
                          </div>
                        </div>
                        
                        <Progress value={proposal.votes} className="h-3" />
                      </div>
                      
                      <div className="ml-6 flex flex-col space-y-2">
                        <Button 
                          className="bg-gradient-to-r from-blockchain-green to-electric-blue hover:from-green-600 hover:to-blue-600 text-white"
                          disabled={votedProposals.has(proposal.id)}
                          onClick={() => handleVote(proposal.id)}
                        >
                          <Icon name="ThumbsUp" className="w-4 h-4 mr-2" />
                          For
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-red-400 text-red-400 hover:bg-red-400/10"
                          disabled={votedProposals.has(proposal.id)}
                        >
                          <Icon name="ThumbsDown" className="w-4 h-4 mr-2" />
                          Against
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tokenomics Tab */}
          <TabsContent value="tokenomics" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t.tokenomics}</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                CENTER token distribution and economics
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Token Distribution */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-white">Token Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { label: t.circulating, value: "45%", amount: "450M", color: "bg-electric-blue" },
                    { label: t.staked, value: "30%", amount: "300M", color: "bg-dao-purple" },
                    { label: t.treasury, value: "20%", amount: "200M", color: "bg-blockchain-green" },
                    { label: t.burned, value: "5%", amount: "50M", color: "bg-red-500" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-white">
                        <span>{item.label}</span>
                        <span className="font-semibold">{item.amount}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className={`${item.color} h-3 rounded-full transition-all duration-1000`}
                          style={{ width: item.value }}
                        />
                      </div>
                      <div className="text-right text-sm text-gray-400">{item.value}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Token Metrics */}
              <div className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Token Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-white">$1.42</div>
                        <div className="text-sm text-gray-400">Current Price</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-blockchain-green">+12.5%</div>
                        <div className="text-sm text-gray-400">24h Change</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-white">1.42B</div>
                        <div className="text-sm text-gray-400">Market Cap</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-white">98.5M</div>
                        <div className="text-sm text-gray-400">24h Volume</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Staking Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-dao-purple mb-2">12.5%</div>
                      <div className="text-gray-300 mb-4">Annual Percentage Yield</div>
                      <Button className="w-full bg-gradient-to-r from-dao-purple to-electric-blue hover:from-purple-600 hover:to-blue-600 text-white">
                        <Icon name="Lock" className="w-4 h-4 mr-2" />
                        Stake Tokens
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t.community}</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join our global community of builders and innovators
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { platform: "Discord", members: "12.5K", icon: "MessageSquare", color: "bg-indigo-500" },
                { platform: "Twitter", members: "48.2K", icon: "Twitter", color: "bg-blue-400" },
                { platform: "Telegram", members: "23.1K", icon: "Send", color: "bg-blue-500" },
                { platform: "GitHub", members: "3.2K", icon: "Github", color: "bg-gray-600" },
                { platform: "Forum", members: "8.9K", icon: "MessageCircle", color: "bg-green-500" },
                { platform: "YouTube", members: "15.7K", icon: "Play", color: "bg-red-500" }
              ].map((social, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${social.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon name={social.icon as any} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{social.platform}</h3>
                    <p className="text-gray-400 text-lg font-medium">{social.members} members</p>
                    <Button className="mt-4 w-full bg-gradient-to-r from-electric-blue to-dao-purple hover:from-blue-600 hover:to-purple-600 text-white">
                      Join Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}