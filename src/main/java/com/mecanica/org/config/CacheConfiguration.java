package com.mecanica.org.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.mecanica.org.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.mecanica.org.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.mecanica.org.domain.User.class.getName());
            createCache(cm, com.mecanica.org.domain.Authority.class.getName());
            createCache(cm, com.mecanica.org.domain.User.class.getName() + ".authorities");
            createCache(cm, com.mecanica.org.domain.Automovil.class.getName());
            createCache(cm, com.mecanica.org.domain.Automovil.class.getName() + ".averias");
            createCache(cm, com.mecanica.org.domain.TipoCombustible.class.getName());
            createCache(cm, com.mecanica.org.domain.TipoCombustible.class.getName() + ".automovils");
            createCache(cm, com.mecanica.org.domain.ClasificacionAutomovil.class.getName());
            createCache(cm, com.mecanica.org.domain.ClasificacionAutomovil.class.getName() + ".automovils");
            createCache(cm, com.mecanica.org.domain.Cliente.class.getName());
            createCache(cm, com.mecanica.org.domain.Cliente.class.getName() + ".automovils");
            createCache(cm, com.mecanica.org.domain.Marca.class.getName());
            createCache(cm, com.mecanica.org.domain.Marca.class.getName() + ".automovils");
            createCache(cm, com.mecanica.org.domain.TipoAutomovil.class.getName());
            createCache(cm, com.mecanica.org.domain.TipoAutomovil.class.getName() + ".automovils");
            createCache(cm, com.mecanica.org.domain.Averia.class.getName());
            createCache(cm, com.mecanica.org.domain.Averia.class.getName() + ".bitacoraAverias");
            createCache(cm, com.mecanica.org.domain.Averia.class.getName() + ".entradas");
            createCache(cm, com.mecanica.org.domain.Averia.class.getName() + ".pagos");
            createCache(cm, com.mecanica.org.domain.EstadoAveria.class.getName());
            createCache(cm, com.mecanica.org.domain.EstadoAveria.class.getName() + ".averias");
            createCache(cm, com.mecanica.org.domain.Servicio.class.getName());
            createCache(cm, com.mecanica.org.domain.Servicio.class.getName() + ".entradas");
            createCache(cm, com.mecanica.org.domain.BitacoraAveria.class.getName());
            createCache(cm, com.mecanica.org.domain.Entrada.class.getName());
            createCache(cm, com.mecanica.org.domain.Empleado.class.getName());
            createCache(cm, com.mecanica.org.domain.Empleado.class.getName() + ".entradas");
            createCache(cm, com.mecanica.org.domain.Rol.class.getName());
            createCache(cm, com.mecanica.org.domain.Rol.class.getName() + ".empleados");
            createCache(cm, com.mecanica.org.domain.Pago.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
