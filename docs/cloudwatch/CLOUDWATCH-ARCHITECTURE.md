\# Three-Tier CloudWatch Monitoring Architecture



User / Browser

       |

       v

Application Load Balancer

HTTP :80

       |

       v

ECS Fargate - Frontend

Nginx :80

       |

       | backend.three-tier.local:5000

       v

ECS Fargate - Backend

Node.js + Express :5000

       |

       | mongodb.three-tier.local:27017

       v

ECS Fargate - MongoDB

MongoDB :27017



       |

       v

Amazon CloudWatch

Metrics | Logs | Dashboard | Alarms

