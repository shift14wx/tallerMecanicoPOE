package com.mecanica.org.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Marca.
 */
@Entity
@Table(name = "marca")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Marca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "marca")
    private String marca;

    @OneToMany(mappedBy = "marca")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Automovil> automovils = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public Marca marca(String marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Set<Automovil> getAutomovils() {
        return automovils;
    }

    public Marca automovils(Set<Automovil> automovils) {
        this.automovils = automovils;
        return this;
    }

    public Marca addAutomovil(Automovil automovil) {
        this.automovils.add(automovil);
        automovil.setMarca(this);
        return this;
    }

    public Marca removeAutomovil(Automovil automovil) {
        this.automovils.remove(automovil);
        automovil.setMarca(null);
        return this;
    }

    public void setAutomovils(Set<Automovil> automovils) {
        this.automovils = automovils;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Marca)) {
            return false;
        }
        return id != null && id.equals(((Marca) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Marca{" +
            "id=" + getId() +
            ", marca='" + getMarca() + "'" +
            "}";
    }
}
